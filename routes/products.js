const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { requireAuth } = require("../middleware/auth");

// GET /api/products  – public, fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("createdBy", "fullName email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// GET /api/products/:id  – public, single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("createdBy", "fullName email");
    if (!product) return res.status(404).json({ message: "Product not found." });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// POST /api/products  – protected, create product
router.post("/", requireAuth, async (req, res) => {
  try {
    const { name, brand, category, price, rating } = req.body;

    if (!name || !brand || !category || price == null || rating == null) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const product = await Product.create({
      name,
      brand,
      category,
      price,
      rating,
      createdBy: req.session.userId, // Link to logged-in user
    });

    res.status(201).json({ message: "Product created.", product });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// PUT /api/products/:id  – protected, only owner can update
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const { name, brand, category, price, rating } = req.body;

    // ── Authorization: Mongoose query checks ownership ────────
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.session.userId },
      { name, brand, category, price, rating },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(403).json({
        message: "Forbidden. You can only edit your own products.",
      });
    }

    res.json({ message: "Product updated.", product });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// DELETE /api/products/:id  – protected, only owner can delete
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    // ── Authorization: Mongoose query checks ownership ────────
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.session.userId,
    });

    if (!product) {
      return res.status(403).json({
        message: "Forbidden. You can only delete your own products.",
      });
    }

    res.json({ message: "Product deleted." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

module.exports = router;

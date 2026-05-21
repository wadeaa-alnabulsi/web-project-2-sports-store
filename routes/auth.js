const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const user = await User.create({ fullName, email, password });

    // Auto-login after register
    req.session.userId = user._id;
    req.session.userFullName = user.fullName;

    res.status(201).json({
      message: "Registered successfully.",
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    req.session.userId = user._id;
    req.session.userFullName = user.fullName;

    res.json({
      message: "Logged in successfully.",
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed." });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully." });
  });
});

// GET /api/auth/me  – check current session
router.get("/me", (req, res) => {
  if (!req.session?.userId) {
    return res.status(401).json({ message: "Not logged in." });
  }
  res.json({
    user: {
      id: req.session.userId,
      fullName: req.session.userFullName,
    },
  });
});

module.exports = router;

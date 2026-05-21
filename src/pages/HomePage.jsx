import { useState, useEffect } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";

export default function HomePage({ user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await API.get("/api/products");
      setProducts(res.data);
    } catch {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(formData) {
    try {
      await API.post("/api/products", formData);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add product.");
    }
  }

  async function handleEdit(formData) {
    try {
      await API.put(`/api/products/${editingProduct._id}`, formData);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update product.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;
    try {
      await API.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product.");
    }
  }

  // ── Client-side filtering & sorting (same logic as Project 1) ──
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  let filtered = products;
  if (selectedCategory !== "All") {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }
  if (search.trim()) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (sortBy === "price-low")  filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "rating")     filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div style={{ padding: "30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
        <h2 style={{ color: "#2c3e50", margin: 0 }}>Sports Products</h2>
        {user && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: "10px 20px", backgroundColor: "#27ae60",
              color: "white", border: "none", borderRadius: "5px",
              cursor: "pointer", fontWeight: "bold", fontSize: "15px",
            }}
          >
            + Add Product
          </button>
        )}
      </div>

      {/* Search & Sort */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search by name or brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "220px" }}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="default">Sort: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Category Filter */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "25px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "6px 14px", borderRadius: "20px",
              border: "1px solid #2c3e50",
              backgroundColor: selectedCategory === cat ? "#2c3e50" : "white",
              color: selectedCategory === cat ? "white" : "#2c3e50",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <p style={{ color: "#888" }}>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <p style={{ color: "#888", marginBottom: "15px" }}>{filtered.length} products found</p>
          {filtered.length === 0 ? (
            <p style={{ color: "red" }}>No products found.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
              {filtered.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  user={user}
                  onEdit={(p) => setEditingProduct(p)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      )}

      {!user && (
        <p style={{ color: "#888", marginTop: "20px", fontStyle: "italic" }}>
          💡 Log in to add, edit, or delete your own products.
        </p>
      )}

      {/* Add Form Modal */}
      {showForm && (
        <ProductForm
          onSubmit={handleAdd}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Edit Form Modal */}
      {editingProduct && (
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleEdit}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}

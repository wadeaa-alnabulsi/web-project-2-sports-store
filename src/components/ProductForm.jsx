import { useState, useEffect } from "react";

const CATEGORIES = ["Running", "Basketball", "Soccer", "CrossFit", "Tennis", "Accessories", "Wearables"];

export default function ProductForm({ onSubmit, onClose, initialData }) {
  const [form, setForm] = useState({
    name: "", brand: "", category: "Running", price: "", rating: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        brand: initialData.brand,
        category: initialData.category,
        price: initialData.price,
        rating: initialData.rating,
      });
    }
  }, [initialData]);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit() {
    onSubmit({
      ...form,
      price: parseFloat(form.price),
      rating: parseFloat(form.rating),
    });
  }

  const inputStyle = {
    width: "100%", padding: "8px", borderRadius: "5px",
    border: "1px solid #ccc", boxSizing: "border-box", marginTop: "4px",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: "white", borderRadius: "10px", padding: "30px",
        width: "100%", maxWidth: "420px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      }}>
        <h2 style={{ marginTop: 0, color: "#2c3e50" }}>
          {initialData ? "Edit Product" : "Add New Product"}
        </h2>

        {[
          { label: "Product Name", name: "name", type: "text" },
          { label: "Brand", name: "brand", type: "text" },
          { label: "Price ($)", name: "price", type: "number" },
          { label: "Rating (0–5)", name: "rating", type: "number" },
        ].map(({ label, name, type }) => (
          <div key={name} style={{ marginBottom: "12px" }}>
            <label style={{ fontWeight: "bold", fontSize: "14px" }}>{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        ))}

        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontWeight: "bold", fontSize: "14px" }}>Category</label>
          <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
          <button
            onClick={handleSubmit}
            style={{
              flex: 1, padding: "10px", backgroundColor: "#2c3e50",
              color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold",
            }}
          >
            {initialData ? "Update" : "Add Product"}
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "10px", backgroundColor: "#95a5a6",
              color: "white", border: "none", borderRadius: "5px", cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

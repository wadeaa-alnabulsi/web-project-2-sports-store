export default function ProductCard({ product, user, onEdit, onDelete }) {
  const isOwner = user && product.createdBy && (
    product.createdBy._id === user.id ||
    product.createdBy === user.id
  );

  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      backgroundColor: "white",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      position: "relative",
    }}>
      {isOwner && (
        <span style={{
          position: "absolute", top: "8px", right: "8px",
          backgroundColor: "#27ae60", color: "white",
          fontSize: "10px", padding: "2px 6px", borderRadius: "10px",
        }}>
          Mine
        </span>
      )}
      <h3 style={{ margin: "0 0 8px", color: "#2c3e50" }}>{product.name}</h3>
      <p style={{ margin: "4px 0", color: "#555" }}>Brand: {product.brand}</p>
      <p style={{ margin: "4px 0", color: "#555" }}>Category: {product.category}</p>
      <p style={{ margin: "4px 0", color: "#e67e22", fontWeight: "bold" }}>${product.price}</p>
      <p style={{ margin: "4px 0", color: "#f39c12" }}>⭐ {product.rating}</p>
      {product.createdBy?.fullName && (
        <p style={{ margin: "4px 0", color: "#aaa", fontSize: "12px" }}>
          Added by: {product.createdBy.fullName}
        </p>
      )}

      {isOwner && (
        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
          <button
            onClick={() => onEdit(product)}
            style={{
              flex: 1, padding: "6px", backgroundColor: "#3498db",
              color: "white", border: "none", borderRadius: "5px", cursor: "pointer",
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product._id)}
            style={{
              flex: 1, padding: "6px", backgroundColor: "#e74c3c",
              color: "white", border: "none", borderRadius: "5px", cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

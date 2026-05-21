export default function Header({ currentPage, setCurrentPage, user, onLogout }) {
  return (
    <div style={{ backgroundColor: "#2c3e50", padding: "15px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
      <h2 style={{ color: "white", margin: 0 }}>🏅 Sports Store</h2>
      <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
        {["Home", "About"].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              padding: "8px 16px",
              backgroundColor: currentPage === page ? "#e67e22" : "transparent",
              color: "white",
              border: "1px solid white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {page}
          </button>
        ))}

        {user ? (
          <>
            <span style={{ color: "#f0f0f0", fontSize: "14px" }}>
              👤 {user.fullName}
            </span>
            <button
              onClick={onLogout}
              style={{
                padding: "8px 16px",
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {["Login", "Register"].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: currentPage === page ? "#e67e22" : "transparent",
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {page}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

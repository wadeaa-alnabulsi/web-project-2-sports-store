import { useState } from "react";
import API from "../api";

export default function RegisterPage({ setUser, setCurrentPage }) {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleRegister() {
    setError("");
    if (!form.fullName || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    try {
      setLoading(true);
      const res = await API.post("/api/auth/register", form);
      setUser(res.data.user);
      setCurrentPage("Home");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%", padding: "10px", borderRadius: "5px",
    border: "1px solid #ccc", boxSizing: "border-box", fontSize: "14px",
  };

  return (
    <div style={{ padding: "50px 30px", maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ color: "#2c3e50" }}>Register</h2>

      {error && (
        <div style={{ backgroundColor: "#fde8e8", color: "#c0392b", padding: "10px", borderRadius: "5px", marginBottom: "15px" }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Full Name</label>
        <input
          type="text" name="fullName" placeholder="Enter your full name"
          value={form.fullName} onChange={handleChange} style={inputStyle}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email</label>
        <input
          type="email" name="email" placeholder="Enter your email"
          value={form.email} onChange={handleChange} style={inputStyle}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Password</label>
        <input
          type="password" name="password" placeholder="Minimum 6 characters"
          value={form.password} onChange={handleChange} style={inputStyle}
        />
      </div>

      <button
        onClick={handleRegister}
        disabled={loading}
        style={{
          padding: "10px 20px", backgroundColor: loading ? "#95a5a6" : "#2c3e50",
          color: "white", border: "none", borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer", width: "100%", fontSize: "15px",
        }}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <p style={{ color: "#888", marginTop: "15px", fontSize: "13px" }}>
        Already have an account?{" "}
        <span
          onClick={() => setCurrentPage("Login")}
          style={{ color: "#2c3e50", cursor: "pointer", fontWeight: "bold" }}
        >
          Login here
        </span>
      </p>
    </div>
  );
}

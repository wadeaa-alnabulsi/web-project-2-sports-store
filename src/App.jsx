import { useState, useEffect } from "react";
import API from "./api";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [user, setUser] = useState(null); // { id, fullName }
  const [authLoading, setAuthLoading] = useState(true);

  // Check if user already has a session on load
  useEffect(() => {
    API.get("/api/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setAuthLoading(false));
  }, []);

  function handleLogout() {
    API.post("/api/auth/logout").then(() => {
      setUser(null);
      setCurrentPage("Home");
    });
  }

  function renderPage() {
    if (currentPage === "Home")
      return <HomePage user={user} />;
    if (currentPage === "Login")
      return <LoginPage setUser={setUser} setCurrentPage={setCurrentPage} />;
    if (currentPage === "Register")
      return <RegisterPage setUser={setUser} setCurrentPage={setCurrentPage} />;
    if (currentPage === "About")
      return <AboutPage />;
  }

  if (authLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <p style={{ fontSize: "18px", color: "#888" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />
      {renderPage()}
      <div style={{ textAlign: "center", padding: "20px", color: "#888", borderTop: "1px solid #ddd", marginTop: "40px" }}>
        Sports Store ©️ 2025 - MERN Stack Project
      </div>
    </div>
  );
}

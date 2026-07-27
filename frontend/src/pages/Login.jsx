import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUser } from "../services/authService";

// IMPORT YOUR IMAGE HERE
import bgImage from "/src/assets/municipal-hall.png";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      await axios.post("http://localhost:5000/api/audit-logs/create", {
        action_type: "LOGIN",
        description: `${data.user.full_name} logged into the system`,
        performed_by: data.user.full_name,
      });

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/staff");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw", // Forces the background to be full width
        position: "fixed", // Bypasses parent margins/paddings if they exist
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // Using Inter / Segoe UI fonts for a sharp, modern geometric look
        fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
        
        // Darker rich emerald-slate overlay to make the municipal image pop gracefully
        backgroundImage: `linear-gradient(rgba(11, 27, 22, 0.65), rgba(15, 23, 42, 0.65)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.92)", 
          backdropFilter: "blur(12px)", // Increased blur effect
          padding: "40px",
          borderRadius: "20px", // Smoother modern rounded edges
          width: "90%",
          maxWidth: "420px",
          boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.4)",
          boxSizing: "border-box",
          border: "1px solid rgba(255, 255, 255, 0.4)", // Subtly accents the card frame
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          {/* MODERN NOTIFICATION BELL ICON */}
          <div style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            justifyContent: "center",
            backgroundColor: "#d1fae5", 
            padding: "12px", 
            borderRadius: "50%", 
            marginBottom: "16px",
            color: "#059669"
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
          </div>

          <h1
            style={{
              fontSize: "30px",
              fontWeight: "900", // Strong bolder title font
              letterSpacing: "-0.75px",
              margin: "0 0 6px 0",
              color: "#064e3b", // Deep rich corporate forest green
            }}
          >
            ReLifeNotify
          </h1>
          <p style={{ color: "#475569", margin: 0, fontSize: "14px", fontWeight: "500" }}>
            Municipal Information Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label 
              htmlFor="email" 
              style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#064e3b", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="name@municipality.gov"
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "14px 16px", // Balanced padding
                border: "1.5px solid #cbd5e1",
                borderRadius: "10px",
                fontSize: "15px",
                color: "#0f172a",
                outline: "none",
                transition: "all 0.2s ease-in-out",
                boxSizing: "border-box",
                backgroundColor: "#fff"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#059669"; // Emerald Focus Ring
                e.target.style.boxShadow = "0 0 0 4px rgba(5, 150, 105, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#cbd5e1";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#064e3b", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "1.5px solid #cbd5e1",
                borderRadius: "10px",
                fontSize: "15px",
                color: "#0f172a",
                outline: "none",
                transition: "all 0.2s ease-in-out",
                boxSizing: "border-box",
                backgroundColor: "#fff"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#059669";
                e.target.style.boxShadow = "0 0 0 4px rgba(5, 150, 105, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#cbd5e1";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <button
            type="submit"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: isHovered ? "#047857" : "#059669", // Vibrant, inviting Emerald green
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "16px",
              marginTop: "10px",
              boxShadow: isHovered ? "0 10px 15px -3px rgba(5, 150, 105, 0.4)" : "none",
              transition: "all 0.2s ease-in-out",
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
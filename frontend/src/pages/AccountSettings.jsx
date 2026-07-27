import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// COMPONENTS
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AccountSettings() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/account-settings/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData((prev) => ({
        ...prev,
        fullname: res.data.fullname,
        email: res.data.email,
      }));
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setMessage("");

    try {
      const res = await axios.put("http://localhost:5000/api/account-settings/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message || "Profile updated successfully");
      setFormData((prev) => ({ ...prev, currentPassword: "", newPassword: "" }));
    } catch (err) {
      console.error(err);
      setIsError(true);
      setMessage(err.response?.data?.error || "Failed to update account. Ensure password is correct.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      
      {/* BRAND EMERALD HEADER */}
      <div style={{ backgroundColor: "#004421", padding: "32px max(24px, 5%)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "800", color: "#ffffff" }}>Account Settings</h1>
          <p style={{ margin: "6px 0 0 0", fontSize: "14px", color: "#cbd5e1" }}>Manage your account security and profile</p>
        </div>
        <button onClick={handleLogout} style={{ backgroundColor: "transparent", color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)", padding: "8px 18px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>
          <span>↳</span> Sign Out
        </button>
      </div>

      <Navbar />

      <div style={{ padding: "40px 20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ background: "#ffffff", padding: "32px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0" }}>
          
          {message && (
            <div style={{ marginBottom: "20px", padding: "12px", borderRadius: "8px", backgroundColor: isError ? "#fef2f2" : "#f0fdf4", color: isError ? "#991b1b" : "#166534", fontSize: "14px", textAlign: "center" }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {["fullname", "email", "currentPassword", "newPassword"].map((field) => (
              <div key={field} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569", textTransform: "capitalize" }}>
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type={field.includes("Password") ? "password" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field.includes("Password") ? "••••••••" : ""}
                  style={{ padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                />
              </div>
            ))}
            <button type="submit" style={{ marginTop: "10px", padding: "12px", backgroundColor: "#004421", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
              Save Changes
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AccountSettings;
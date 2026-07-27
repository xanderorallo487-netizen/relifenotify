import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Imported for programmatic redirection

// COMPONENTS
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AlertBroadcasting() {
  const navigate = useNavigate(); // Initialize navigation hook
  const [alerts, setAlerts] = useState([]);

  const [form, setForm] = useState({
    title: "",
    message: "",
    alert_type: "",
    target_barangay: "",
  });

  useEffect(() => {
    fetchAlerts();
  }, []);

  // =====================================
  // LOGOUT HANDLER
  // =====================================
  const handleLogout = () => {
    // Clear credentials and global variables
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    // Redirect to routing root/login page
    navigate("/login"); 
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/alerts");

      if (response.data.success) {
        setAlerts(response.data.alerts);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/alerts", form);

      setForm({
        title: "",
        message: "",
        alert_type: "",
        target_barangay: "",
      });

      fetchAlerts();
    } catch (error) {
      console.error(error);
    }
  };

  const getTypeBadgeStyle = (type) => {
    const normalize = type?.toLowerCase() || "";
    if (normalize.includes("critical") || normalize.includes("danger") || normalize.includes("evac")) {
      return { color: "#dc2626", bg: "#fef2f2" };
    }
    if (normalize.includes("warn") || normalize.includes("prep")) {
      return { color: "#d97706", bg: "#fffbeb" };
    }
    return { color: "#2563eb", bg: "#eff6ff" };
  };

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* BRAND EMERALD HEADER BANNER WITH SIGN OUT */}
      <div 
        style={{ 
          backgroundColor: "#004421", 
          padding: "32px max(24px, 5%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "'Inter', -apple-system, sans-serif"
        }}
      >
        <div>
          <h1 
            style={{ 
              margin: "0 0 6px 0", 
              fontSize: "32px", 
              fontWeight: "800", 
              color: "#ffffff",
              letterSpacing: "-0.5px"
            }}
          >
            Alert Broadcasting
          </h1>
          <p 
            style={{ 
              margin: 0, 
              fontSize: "14px", 
              color: "#cbd5e1",
              fontWeight: "400",
              opacity: 0.95
            }}
          >
            Send emergency alerts and manage critical community announcements
          </p>
        </div>

        {/* ACTIVE SIGN OUT BUTTON */}
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "transparent",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "8px 18px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.15s ease"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255, 255, 255, 0.08)"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
        >
          Sign Out
        </button>
      </div>

      {/* NAVBAR WRAPPER */}
      <div style={{ display: "block", width: "100%" }}>
        <Navbar />
      </div>

      {/* MAIN CONTENT AREA */}
      <div
        style={{
          padding: "40px max(24px, 5%)",
          maxWidth: "1600px",
          margin: "0 auto",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "32px",
            alignItems: "start"
          }}
        >
          {/* STICKY FORM PANEL */}
          <div style={boxStyle}>
            <h2 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.5px" }}>
              Send New Alert
            </h2>
            <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#64748b" }}>
              Broadcast real-time emergency information to specific sectors.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <span style={labelStyle}>Alert Heading</span>
                <input
                  name="title"
                  placeholder="e.g., Flash Flood Warning"
                  value={form.title}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <span style={labelStyle}>Broadcast Message</span>
                <textarea
                  name="message"
                  placeholder="Provide precise details, guidelines, or instruction sets..."
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  style={{ ...inputStyle, resize: "none" }}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <span style={labelStyle}>Severity / Type</span>
                  <input
                    name="alert_type"
                    placeholder="e.g., Critical"
                    value={form.alert_type}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
                <div>
                  <span style={labelStyle}>Target Scope</span>
                  <input
                    name="target_barangay"
                    placeholder="e.g., Barangay Central"
                    value={form.target_barangay}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  background: "#014421",
                  color: "#fff",
                  border: "none",
                  padding: "14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "14px",
                  marginTop: "12px",
                  transition: "background-color 0.15s ease",
                }}
                onMouseEnter={(e) => e.target.style.background = "#02592c"}
                onMouseLeave={(e) => e.target.style.background = "#014421"}
              >
                Broadcast System Alert
              </button>
            </form>
          </div>

          {/* DYNAMIC ALERT LOG VIEW */}
          <div style={boxStyle}>
            <h2 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.5px" }}>
              Sent Alerts Log
            </h2>
            <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#64748b" }}>
              Review of active broadcasts currently distributed across targeted channels.
            </p>

            <div style={{ overflowX: "auto" }}>
              <table
                width="100%"
                style={{
                  borderCollapse: "collapse",
                  textAlign: "left",
                  fontSize: "14px"
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                    <th style={{ padding: "12px 8px", color: "#94a3b8", fontWeight: "700", fontSize: "11px", textTransform: "uppercase" }}>Alert Overview</th>
                    <th style={{ padding: "12px 8px", color: "#94a3b8", fontWeight: "700", fontSize: "11px", textTransform: "uppercase" }}>Classification</th>
                    <th style={{ padding: "12px 8px", color: "#94a3b8", fontWeight: "700", fontSize: "11px", textTransform: "uppercase" }}>Target Scope</th>
                    <th style={{ padding: "12px 8px", color: "#94a3b8", fontWeight: "700", fontSize: "11px", textTransform: "uppercase" }}>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {alerts.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ padding: "32px 8px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                        No broadcast items registered in the active system logs.
                      </td>
                    </tr>
                  ) : (
                    alerts.map((alert) => {
                      const typeMeta = getTypeBadgeStyle(alert.alert_type);
                      return (
                        <tr
                          key={alert.id}
                          style={{ 
                            borderBottom: "1px solid #f1f5f9",
                            transition: "background-color 0.1s ease"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                        >
                          <td style={{ padding: "16px 8px", maxWidth: "240px" }}>
                            <div style={{ fontWeight: "700", color: "#0f172a", marginBottom: "4px" }}>{alert.title}</div>
                            <div style={{ color: "#64748b", fontSize: "13px", lineHeight: "1.4" }}>{alert.message}</div>
                          </td>
                          <td style={{ padding: "16px 8px", verticalAlign: "middle" }}>
                            <span
                              style={{
                                color: typeMeta.color,
                                backgroundColor: typeMeta.bg,
                                fontWeight: "700",
                                fontSize: "11px",
                                padding: "4px 10px",
                                borderRadius: "6px",
                                textTransform: "uppercase",
                                inlineBlock: "block",
                                whiteSpace: "nowrap"
                              }}
                            >
                              {alert.alert_type}
                            </span>
                          </td>
                          <td style={{ padding: "16px 8px", color: "#334155", fontWeight: "500", verticalAlign: "middle" }}>
                            {alert.target_barangay}
                          </td>
                          <td style={{ padding: "16px 8px", verticalAlign: "middle" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#16a34a", fontWeight: "600", fontSize: "13px" }}>
                              <span style={{ width: "6px", height: "6px", backgroundColor: "#16a34a", borderRadius: "50%" }}></span>
                              {alert.status || "Active"}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const boxStyle = {
  background: "#ffffff",
  padding: "32px",
  borderRadius: "14px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02), 0 4px 12px rgba(0, 0, 0, 0.03)",
};

const labelStyle = {
  display: "block",
  fontSize: "11px",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  color: "#94a3b8",
  marginBottom: "6px"
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
  backgroundColor: "#ffffff",
  boxSizing: "border-box",
  fontFamily: "inherit",
  color: "#1e293b",
  transition: "border-color 0.15s ease",
  marginTop: "0px",
  marginBottom: "4px"
};

export default AlertBroadcasting;
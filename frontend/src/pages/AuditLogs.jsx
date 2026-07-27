import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// COMPONENTS
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AuditLogs() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/audit-logs");
      if (response.data.success) {
        setLogs(response.data.logs);
      }
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      {/* BRAND EMERALD HEADER */}
      <div style={{ backgroundColor: "#004421", padding: "32px max(24px, 5%)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "800", color: "#ffffff" }}>Audit Logs</h1>
          <p style={{ margin: "6px 0 0 0", fontSize: "14px", color: "#cbd5e1" }}>System Activity Monitoring</p>
        </div>
        <button onClick={handleLogout} style={{ backgroundColor: "transparent", color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)", padding: "8px 18px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>
          <span></span> Sign Out
        </button>
      </div>

      <Navbar />

      <div style={{ padding: "40px max(24px, 5%)", maxWidth: "1440px", margin: "0 auto" }}>
        <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
          <div style={{ padding: "24px", borderBottom: "1px solid #f1f5f9" }}>
            <h2 style={{ margin: 0, fontSize: "20px", color: "#0f172a" }}>System Activity Logs</h2>
          </div>

          {/* SCROLLABLE TABLE AREA */}
          <div style={{ maxHeight: "600px", overflowY: "auto" }}>
            <table width="100%" style={{ borderCollapse: "collapse", textAlign: "left" }}>
              <thead style={{ backgroundColor: "#f8fafc", position: "sticky", top: 0 }}>
                <tr>
                  {["ID", "Action", "Description", "Performed By", "Date"].map((h) => (
                    <th key={h} style={{ padding: "16px", fontSize: "12px", textTransform: "uppercase", color: "#64748b", borderBottom: "2px solid #f1f5f9" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading logs...</td></tr>
                ) : logs.length > 0 ? (
                  logs.map((log) => (
                    <tr key={log.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "16px", fontFamily: "monospace", color: "#475569" }}>{log.id}</td>
                      <td style={{ padding: "16px", fontWeight: "600", color: "#0f172a" }}>{log.action_type}</td>
                      <td style={{ padding: "16px", color: "#475569" }}>{log.description}</td>
                      <td style={{ padding: "16px", color: "#475569" }}>{log.performed_by}</td>
                      <td style={{ padding: "16px", color: "#64748b" }}>{new Date(log.created_at).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" style={{ padding: "40px", textAlign: "center" }}>No logs found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AuditLogs;
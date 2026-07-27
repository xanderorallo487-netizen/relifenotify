import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Imported for programmatic redirection

// COMPONENTS
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ReliefOperations() {
  const navigate = useNavigate(); // Initialize navigation hook
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    fetchOperations();
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

  const fetchOperations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/relief-operations"
      );

      if (response.data.success) {
        setOperations(response.data.operations);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Helper to color-code operation status cleanly
  const getStatusBadgeStyle = (status) => {
    const normalize = status?.toLowerCase() || "";
    if (normalize === "distributed") {
      return { color: "#16a34a", bg: "#f0fdf4" };
    }
    if (normalize === "ongoing") {
      return { color: "#d97706", bg: "#fffbeb" };
    }
    return { color: "#dc2626", bg: "#fef2f2" };
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
            Relief Distribution Monitoring
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
            Track relief operations and distributions
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
        {/* DYNAMIC RELIEF LOG VIEW PANEL */}
        <div
          style={{
            background: "#ffffff",
            padding: "32px",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02), 0 4px 12px rgba(0, 0, 0, 0.03)",
          }}
        >
          <h2 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.5px" }}>
            Relief Distribution Records
          </h2>
          <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#64748b" }}>
            Review real-time monitoring records of active and completed supply deployment routines.
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
                  <th style={tableHeaderStyle}>Operation</th>
                  <th style={tableHeaderStyle}>Barangay</th>
                  <th style={tableHeaderStyle}>Relief Type</th>
                  <th style={tableHeaderStyle}>Quantity</th>
                  <th style={tableHeaderStyle}>Distributed By</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={tableHeaderStyle}>Date</th>
                </tr>
              </thead>

              <tbody>
                {operations.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ padding: "32px 8px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                      No relief operations records registered in the monitoring system logs.
                    </td>
                  </tr>
                ) : (
                  operations.map((operation) => {
                    const statusMeta = getStatusBadgeStyle(operation.status);
                    return (
                      <tr
                        key={operation.id}
                        style={{ 
                          borderBottom: "1px solid #f1f5f9",
                          transition: "background-color 0.1s ease"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                      >
                        <td style={{ padding: "16px 8px", fontWeight: "700", color: "#0f172a" }}>
                          {operation.operation_name}
                        </td>
                        <td style={{ padding: "16px 8px", color: "#334155", fontWeight: "500" }}>
                          {operation.barangay}
                        </td>
                        <td style={{ padding: "16px 8px", color: "#475569" }}>
                          {operation.relief_type}
                        </td>
                        <td style={{ padding: "16px 8px", color: "#0f172a", fontWeight: "600" }}>
                          {operation.quantity}
                        </td>
                        <td style={{ padding: "16px 8px", color: "#475569" }}>
                          {operation.distributed_by}
                        </td>
                        <td style={{ padding: "16px 8px", verticalAlign: "middle" }}>
                          <span
                            style={{
                              color: statusMeta.color,
                              backgroundColor: statusMeta.bg,
                              fontWeight: "700",
                              fontSize: "11px",
                              padding: "4px 10px",
                              borderRadius: "6px",
                              textTransform: "uppercase",
                              display: "inline-block",
                              whiteSpace: "nowrap"
                            }}
                          >
                            {operation.status}
                          </span>
                        </td>
                        <td style={{ padding: "16px 8px", color: "#64748b" }}>
                          {new Date(operation.distribution_date).toLocaleDateString()}
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

      <Footer />
    </div>
  );
}

const tableHeaderStyle = {
  padding: "12px 8px",
  color: "#94a3b8",
  fontWeight: "700",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.5px"
};

export default ReliefOperations;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// COMPONENTS
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import IncidentMap from "../components/IncidentMap";

function AdminDashboard() {
  const navigate = useNavigate();

  // =====================================
  // STATES
  // =====================================
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageForm, setMessageForm] = useState({ receiver_id: "", message: "" });
  const [btnHover, setBtnHover] = useState(false);

  // =====================================
  // FETCH DATA
  // =====================================
  useEffect(() => {
    fetchIncidents();
    fetchUsers();
    fetchMessages();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/incidents");
      if (response.data.success) setIncidents(response.data.incidents);
    } catch (error) {
      console.error("Failed to fetch incidents:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin-messages");
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const admin = JSON.parse(localStorage.getItem("user"));
      await axios.post("http://localhost:5000/api/admin-messages", {
        sender_id: admin.id,
        sender_name: admin.full_name,
        receiver_id: messageForm.receiver_id,
        message: messageForm.message
      });
      setMessageForm({ receiver_id: "", message: "" });
      fetchMessages();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, { status });
      fetchUsers();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // =====================================
  // COUNTS & FILTERED RECIPIENTS
  // =====================================
  const totalIncidents = incidents.length;
  const ongoingIncidents = incidents.filter(i => i.status?.toLowerCase() === "ongoing").length;
  const resolvedIncidents = incidents.filter(i => i.status?.toLowerCase() === "resolved").length;
  const affectedBarangays = [...new Set(incidents.map(i => i.barangay))].length;

  // Broaden filters so your dropdown is never trapped empty
  const potentialResponders = users.filter(u => {
    const role = u.role?.toLowerCase();
    return role === "staff" || role === "responder" || role === "user" || role !== "admin";
  });

  return (
    <div style={{ backgroundColor: "#f4f7f6", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      
      {/* FIXED HEADER WITH ZERO OVERLAP */}
      <div style={{
        background: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)",
        padding: "32px max(20px, 4%)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "800", color: "#ffffff", lineHeight: "1.2", letterSpacing: "-0.5px" }}>
            ReLifeNotify Admin Dashboard
          </h1>
          <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#a7f3d0", opacity: 0.9 }}>
            Real-Time Incident Monitoring & Team Coordination
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
            backdropFilter: "blur(4px)",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
          onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
        >
          Sign Out
        </button>
      </div>

      <Navbar />

      <div style={{ padding: "40px max(20px, 4%)" }}>
        
        {/* COUNTER CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "24px", marginBottom: "40px" }}>
          <div style={cardStyle}>
            <span style={{ fontSize: "28px", marginBottom: "8px" }}>🚨</span>
            <h3 style={cardLabelStyle}>Total Incidents</h3>
            <h1 style={cardValueStyle}>{totalIncidents}</h1>
          </div>
          <div style={cardStyle}>
            <span style={{ fontSize: "28px", marginBottom: "8px" }}>⏳</span>
            <h3 style={cardLabelStyle}>Ongoing</h3>
            <h1 style={{ ...cardValueStyle, color: "#d97706" }}>{ongoingIncidents}</h1>
          </div>
          <div style={cardStyle}>
            <span style={{ fontSize: "28px", marginBottom: "8px" }}>✅</span>
            <h3 style={cardLabelStyle}>Resolved</h3>
            <h1 style={{ ...cardValueStyle, color: "#059669" }}>{resolvedIncidents}</h1>
          </div>
          <div style={cardStyle}>
            <span style={{ fontSize: "28px", marginBottom: "8px" }}>📍</span>
            <h3 style={cardLabelStyle}>Barangays Affected</h3>
            <h1 style={{ ...cardValueStyle, color: "#2563eb" }}>{affectedBarangays}</h1>
          </div>
        </div>

        {/* MAP SECTION */}
        <div style={sectionStyle}>
          <h2 style={sectionHeaderStyle}>🗺️ Live GPS Incident Mapping Workspace</h2>
          {loading ? (
            <p style={{ color: "#64748b" }}>Loading mapping engines...</p>
          ) : (
            <div style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid #e2e8f0", marginTop: "16px" }}>
              <IncidentMap incidents={incidents} />
            </div>
          )}
        </div>

        {/* TWO COLUMN GRID: MESSAGES & ACCOUNTS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "32px" }}>
          
          {/* MODERN CHAT & DISPATCH SYSTEM */}
          <div style={sectionStyle}>
            <h2 style={sectionHeaderStyle}>💬 Send Message to Staff</h2>
            <p style={{ margin: "4px 0 20px 0", color: "#64748b", fontSize: "14px" }}>Broadcast urgent updates or task assignments instantly.</p>

            <form onSubmit={handleSendMessage} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Recipient Staff Member</label>
                <select
                  value={messageForm.receiver_id}
                  onChange={(e) => setMessageForm({ ...messageForm, receiver_id: e.target.value })}
                  required
                  style={inputStyle}
                >
                  <option value="">Choose a responder...</option>
                  {potentialResponders.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.full_name} ({u.role || "user"})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Message Context</label>
                <textarea
                  placeholder="Type dispatch updates or safety advisories here..."
                  rows="3"
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                  required
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={{
                  background: btnHover ? "#047857" : "#059669",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "14px",
                  transition: "all 0.2s ease"
                }}
              >
                Send Official Dispatch →
              </button>
            </form>

            {/* UPGRADED CHAT STREAM */}
            <div style={{ marginTop: "28px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", marginBottom: "12px" }}>Sent Dispatches log</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "260px", overflowY: "auto", paddingRight: "6px" }}>
                {messages.map((msg) => (
                  <div
                    key={msg.message_id}
                    style={{
                      background: "#f8fafc",
                      padding: "12px 16px",
                      borderRadius: "14px",
                      border: "1px solid #e2e8f0",
                      position: "relative"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#059669" }}></span>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "#334155" }}>TO: {msg.receiver_name}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: "13.5px", color: "#475569", lineHeight: "1.4" }}>{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MODERN ACCOUNT MANAGEMENT CARDS */}
          <div style={sectionStyle}>
            <h2 style={sectionHeaderStyle}>👥 Manage Active Accounts</h2>
            <p style={{ margin: "4px 0 20px 0", color: "#64748b", fontSize: "14px" }}>Modify system operational clearance rules and privileges.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxHeight: "500px", overflowY: "auto", paddingRight: "6px" }}>
              {users.map((user) => (
                <div
                  key={user.id}
                  style={{
                    background: "#ffffff",
                    borderRadius: "14px",
                    padding: "16px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>{user.full_name}</h4>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>{user.email}</span>
                    </div>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "700",
                      backgroundColor: user.status === "Active" ? "#d1fae5" : "#fee2e2",
                      color: user.status === "Active" ? "#065f46" : "#991b1b"
                    }}>
                      ● {user.status}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8fafc", padding: "8px 12px", borderRadius: "8px" }}>
                    <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "500" }}>Role Assignment:</span>
                    <span style={{ fontSize: "11px", fontWeight: "700", background: "#e2e8f0", color: "#334155", padding: "2px 6px", borderRadius: "4px", textTransform: "uppercase" }}>
                      {user.role}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                    <button
                      onClick={() => updateStatus(user.id, "Active")}
                      style={{ ...actionBtnStyle, background: "#ecfdf5", color: "#065f46", border: "1px solid #a7f3d0" }}
                    >
                      Activate
                    </button>
                    <button
                      onClick={() => updateStatus(user.id, "Inactive")}
                      style={{ ...actionBtnStyle, background: "#fffbeb", color: "#92400e", border: "1px solid #fde68a" }}
                    >
                      Deactivate
                    </button>
                    {user.role !== "admin" && (
                      <button
                        onClick={() => deleteUser(user.id)}
                        style={{ ...actionBtnStyle, background: "#fef2f2", color: "#991b1b", border: "1px solid #fca5a5" }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

// =====================================
// DESIGN SYSTEM STYLES
// =====================================
const cardStyle = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "16px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.02)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const cardLabelStyle = {
  margin: "0 0 4px 0",
  fontSize: "13px",
  fontWeight: "600",
  color: "#64748b"
};

const cardValueStyle = {
  margin: 0,
  fontSize: "28px",
  fontWeight: "800",
  color: "#0f172a"
};

const sectionStyle = {
  background: "#ffffff",
  padding: "28px",
  borderRadius: "16px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.02)",
  marginBottom: "32px"
};

const sectionHeaderStyle = {
  margin: 0,
  fontSize: "18px",
  fontWeight: "800",
  color: "#064e3b",
  letterSpacing: "-0.3px"
};

const labelStyle = {
  display: "block",
  fontSize: "12px",
  fontWeight: "700",
  color: "#334155",
  marginBottom: "6px",
  textTransform: "uppercase",
  letterSpacing: "0.5px"
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
  backgroundColor: "#f8fafc",
  boxSizing: "border-box"
};

const actionBtnStyle = {
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "12px",
  transition: "all 0.15s ease"
};

export default AdminDashboard;
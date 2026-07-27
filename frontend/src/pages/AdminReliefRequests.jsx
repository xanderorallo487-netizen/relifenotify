import React, { useEffect, useState } from "react";
import axios from "axios";

// COMPONENTS
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminReliefRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin-relief-requests");
      setRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, action) => {
    try {
      await axios.put(`http://localhost:5000/api/admin-relief-requests/${action}/${id}`);
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const getBadgeStyle = (status) => {
    const base = { padding: "4px 12px", borderRadius: "12px", fontSize: "11px", fontWeight: "600", textTransform: "uppercase" };
    if (status === "Approved") return { ...base, background: "#dcfce7", color: "#166534" };
    if (status === "Rejected") return { ...base, background: "#fee2e2", color: "#991b1b" };
    if (status === "Completed") return { ...base, background: "#dbeafe", color: "#1e40af" };
    return { ...base, background: "#fef3c7", color: "#92400e" }; // Pending
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      
      {/* EMERALD HEADER - LEFT ALIGNED */}
      <div style={{ backgroundColor: "#004421", padding: "32px max(24px, 5%)" }}>
        <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "800", color: "#ffffff" }}>Relief Requests</h1>
        <p style={{ margin: "6px 0 0 0", fontSize: "14px", color: "#cbd5e1" }}>Manage distribution status</p>
      </div>

      <Navbar />

      <main style={{ padding: "40px max(24px, 5%)", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          
          {requests.map((req) => (
            <div 
              key={req.request_id} 
              style={{ 
                background: "white", 
                padding: "24px", 
                borderRadius: "12px", 
                border: "1px solid #e2e8f0",
                display: "flex", flexDirection: "column", gap: "16px" 
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ margin: 0, fontSize: "16px", color: "#1e293b" }}>{req.title}</h2>
                <span style={getBadgeStyle(req.status)}>{req.status}</span>
              </div>

              <div style={{ fontSize: "13px", color: "#64748b", display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={{ margin: 0 }}><strong>Barangay:</strong> {req.barangay_name}</p>
                <p style={{ margin: 0 }}><strong>Qty:</strong> {req.quantity_requested}</p>
                <p style={{ margin: 0, lineHeight: "1.5" }}>{req.description}</p>
              </div>

              <div style={{ marginTop: "auto", display: "flex", gap: "8px" }}>
                {req.status === "Pending" && (
                  <>
                    <button onClick={() => updateStatus(req.request_id, "approve")} style={{ flex: 1, padding: "8px", background: "#004421", color: "white", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>Approve</button>
                    <button onClick={() => updateStatus(req.request_id, "reject")} style={{ flex: 1, padding: "8px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>Reject</button>
                  </>
                )}
                {req.status === "Approved" && (
                  <button onClick={() => updateStatus(req.request_id, "complete")} style={{ width: "100%", padding: "8px", background: "#2563eb", color: "white", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>Mark Completed</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminReliefRequests;
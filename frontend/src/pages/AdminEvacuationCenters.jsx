import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Added for structural Sign Out redirection

// COMPONENTS
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminEvacuationCenters = () => {
  const navigate = useNavigate(); // Initialize routing navigation
  const [centers, setCenters] = useState([]);
  const [form, setForm] = useState({
    center_name: "",
    barangay: "",
    municipality: "",
    address: "",
    total_capacity: "",
    current_occupancy: 0,
    available_food_packs: 0,
    available_water_boxes: 0,
    available_medicine_kits: 0,
    available_blankets: 0,
    incoming_evacuees: 0,
    emergency_needs: "",
    status: "Open",
    contact_person: "",
    contact_number: ""
  });

  useEffect(() => {
    fetchCenters();
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

  // =====================================
  // FETCH CENTERS
  // =====================================
  const fetchCenters = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin-evacuation-centers"
      );
      setCenters(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // =====================================
  // HANDLE INPUT
  // =====================================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // =====================================
  // SUBMIT CENTER
  // =====================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/admin-evacuation-centers",
        form
      );
      fetchCenters();
      setForm({
        center_name: "",
        barangay: "",
        municipality: "",
        address: "",
        total_capacity: "",
        current_occupancy: 0,
        available_food_packs: 0,
        available_water_boxes: 0,
        available_medicine_kits: 0,
        available_blankets: 0,
        incoming_evacuees: 0,
        emergency_needs: "",
        status: "Open",
        contact_person: "",
        contact_number: ""
      });
    } catch (error) {
      console.error(error);
    }
  };

  // =====================================
  // DELETE CENTER
  // =====================================
  const deleteCenter = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin-evacuation-centers/${id}`
      );
      fetchCenters();
    } catch (error) {
      console.error(error);
    }
  };

  // =====================================
  // STATUS DESIGN MAPPER
  // =====================================
  const getStatusMeta = (status) => {
    switch (status) {
      case "Open":
        return { color: "#16a34a", bg: "#f0fdf4" };
      case "Full":
        return { color: "#dc2626", bg: "#fef2f2" };
      case "Under Maintenance":
        return { color: "#d97706", bg: "#fffbeb" };
      default:
        return { color: "#475569", bg: "#f8fafc" };
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box"
      }}
    >
      {/* BRAND EMERALD HEADER BANNER */}
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
            ReLifeNotify Admin Dashboard
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
            Real-Time Incident Monitoring & Team Coordination
          </p>
        </div>

        {/* ACTIVE SIGN OUT ACTION TRIGGER */}
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

      {/* NAVBAR WRAPPER (Applies background context alignment) */}
      <div style={{ display: "block", width: "100%", backgroundColor: "#1e293b" }}>
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
        
        {/* RESPONSIVE LAYOUT CONTAINER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "32px",
            alignItems: "start"
          }}
        >
          {/* STICKY FORM PANEL */}
          <div
            style={{
              background: "#ffffff",
              padding: "32px",
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02), 0 4px 12px rgba(0, 0, 0, 0.03)",
              position: "sticky",
              top: "24px"
            }}
          >
            <h2 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.5px" }}>
              Add New Center
            </h2>
            <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#64748b" }}>
              Register a shelter facility into the systemic tracking catalog.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px"
              }}
            >
              <input
                type="text"
                name="center_name"
                placeholder="Center Name"
                value={form.center_name}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input
                  type="text"
                  name="barangay"
                  placeholder="Barangay"
                  value={form.barangay}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="municipality"
                  placeholder="Municipality"
                  value={form.municipality}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <textarea
                name="address"
                placeholder="Street Address Details"
                value={form.address}
                onChange={handleChange}
                required
                rows="2"
                style={{ ...inputStyle, resize: "none" }}
              />

              <input
                type="number"
                name="total_capacity"
                placeholder="Maximum Capacity (Persons)"
                value={form.total_capacity}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input
                  type="number"
                  name="available_food_packs"
                  placeholder="Food Packs Allocated"
                  value={form.available_food_packs}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <input
                  type="number"
                  name="available_water_boxes"
                  placeholder="Water Boxes Allocated"
                  value={form.available_water_boxes}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input
                  type="number"
                  name="available_medicine_kits"
                  placeholder="Medicine Kits"
                  value={form.available_medicine_kits}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <input
                  type="number"
                  name="available_blankets"
                  placeholder="Blankets Available"
                  value={form.available_blankets}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <textarea
                name="emergency_needs"
                placeholder="Critical Deficiencies / Emergency Needs"
                value={form.emergency_needs}
                onChange={handleChange}
                rows="2"
                style={{ ...inputStyle, resize: "none" }}
              />

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                style={inputStyle}
              >
                <option>Open</option>
                <option>Full</option>
                <option>Under Maintenance</option>
              </select>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input
                  type="text"
                  name="contact_person"
                  placeholder="In-Charge Officer"
                  value={form.contact_person}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="contact_number"
                  placeholder="Contact Number"
                  value={form.contact_number}
                  onChange={handleChange}
                  style={inputStyle}
                />
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
                  marginTop: "8px",
                  transition: "background-color 0.15s ease"
                }}
                onMouseEnter={(e) => e.target.style.background = "#02592c"}
                onMouseLeave={(e) => e.target.style.background = "#014421"}
              >
                Create Registry Entry
              </button>
            </form>
          </div>

          {/* DYNAMIC CARD GENERATOR GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
              gap: "20px",
              flexGrow: 2
            }}
          >
            {centers.map((center) => {
              const meta = getStatusMeta(center.status);
              return (
                <div
                  key={center.evacuation_id}
                  style={{
                    background: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    overflow: "hidden"
                  }}
                >
                  <div style={{ padding: "24px" }}>
                    {/* Header Row Inside Card */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "20px" }}>
                      <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "800", color: "#0f172a", lineHeight: "1.3", letterSpacing: "-0.3px" }}>
                        {center.center_name}
                      </h3>
                      <span
                        style={{
                          color: meta.color,
                          backgroundColor: meta.bg,
                          fontWeight: "700",
                          fontSize: "11px",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          border: `1px solid ${meta.color}20`,
                          whiteSpace: "nowrap"
                        }}
                      >
                        {center.status}
                      </span>
                    </div>

                    {/* Meta Specifications */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", color: "#334155" }}>
                      
                      <div>
                        <span style={labelStyle}>Jurisdiction</span>
                        <div style={valueStyle}>{center.barangay}, {center.municipality}</div>
                      </div>

                      <div>
                        <span style={labelStyle}>Exact Address</span>
                        <div style={valueStyle}>{center.address}</div>
                      </div>

                      {/* Progress Bar Container */}
                      <div style={{ margin: "4px 0" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                          <span style={labelStyle}>Occupancy Metrics</span>
                          <span style={{ fontSize: "12px", fontWeight: "700", color: "#0f172a" }}>
                            {center.current_occupancy} / {center.total_capacity}
                          </span>
                        </div>
                        <div style={{ height: "6px", width: "100%", backgroundColor: "#f1f5f9", borderRadius: "10px", overflow: "hidden" }}>
                          <div 
                            style={{ 
                              height: "100%", 
                              width: `${Math.min(100, (center.current_occupancy / (center.total_capacity || 1)) * 100)}%`, 
                              backgroundColor: meta.color,
                              transition: "width 0.4s ease"
                            }} 
                          />
                        </div>
                      </div>

                      {/* Supplies Section */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", background: "#f8fafc", padding: "12px", borderRadius: "8px", margin: "6px 0" }}>
                        <div>
                          <div style={miniLabelStyle}>Food Packs</div>
                          <div style={miniValueStyle}>{center.available_food_packs} units</div>
                        </div>
                        <div>
                          <div style={miniLabelStyle}>Water Boxes</div>
                          <div style={miniValueStyle}>{center.available_water_boxes} boxes</div>
                        </div>
                        <div>
                          <div style={miniLabelStyle}>Medicine Kits</div>
                          <div style={miniValueStyle}>{center.available_medicine_kits} kits</div>
                        </div>
                        <div>
                          <div style={miniLabelStyle}>Blankets</div>
                          <div style={miniValueStyle}>{center.available_blankets} pcs</div>
                        </div>
                      </div>

                      <div>
                        <span style={labelStyle}>Incoming Logistics Queue</span>
                        <div style={valueStyle}>{center.incoming_evacuees} registered enroute</div>
                      </div>

                      <div>
                        <span style={labelStyle}>Urgent Incident Provisions</span>
                        <div style={{ ...valueStyle, color: center.emergency_needs ? "#b45309" : "#475569", fontWeight: center.emergency_needs ? "600" : "400" }}>
                          {center.emergency_needs || "No shortage reports registered"}
                        </div>
                      </div>

                      <div style={{ borderTop: "1px dashed #e2e8f0", paddingTop: "12px", marginTop: "4px" }}>
                        <span style={labelStyle}>Assigned Management Liaison</span>
                        <div style={{ ...valueStyle, fontWeight: "600" }}>{center.contact_person || "Unassigned"}</div>
                        <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>{center.contact_number || "No contact line"}</div>
                      </div>

                    </div>
                  </div>

                  {/* Operational Controls Footer */}
                  <div style={{ padding: "0 24px 24px 24px" }}>
                    <button
                      onClick={() => deleteCenter(center.evacuation_id)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        background: "transparent",
                        color: "#94a3b8",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "13px",
                        transition: "all 0.15s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#dc2626";
                        e.target.style.borderColor = "#fecaca";
                        e.target.style.background = "#fef2f2";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#94a3b8";
                        e.target.style.borderColor = "#e2e8f0";
                        e.target.style.background = "transparent";
                      }}
                    >
                      Purge Logs
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

// GLOBAL INLINE UI SCHEMA STYLES
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
  transition: "border-color 0.15s ease"
};

const labelStyle = {
  display: "block",
  fontSize: "11px",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  color: "#94a3b8",
  marginBottom: "2px"
};

const valueStyle = {
  fontSize: "14px",
  color: "#334155",
  lineHeight: "1.4"
};

const miniLabelStyle = {
  fontSize: "11px",
  color: "#64748b",
  fontWeight: "600"
};

const miniValueStyle = {
  fontSize: "13px",
  fontWeight: "700",
  color: "#1e293b"
};

export default AdminEvacuationCenters;
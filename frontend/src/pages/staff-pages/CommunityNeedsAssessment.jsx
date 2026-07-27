import React, { useEffect, useState } from "react";
import axios from "axios";

import StaffHeader from "../../components/StaffHeader";
import StaffNavbar from "../../components/StaffNavbar";
import StaffFooter from "../../components/StaffFooter";

const CommunityNeedsAssessment = () => {

  const [assessments, setAssessments] = useState([]);

  const [form, setForm] = useState({
    barangay_id: "",
    officer_id: "",
    resident_name: "",
    household_id: "",
    barangay_name: "",
    municipality: "",
    need_type: "Food",
    quantity_needed: 1,
    urgency_level: "Medium",
    status: "Pending",
    notes: ""
  });

  useEffect(() => {
    fetchAssessments();
  }, []);

  // =====================================
  // FETCH
  // =====================================

  const fetchAssessments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/community-needs-assessment"
      );
      setAssessments(res.data);
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
  // SUBMIT (ENCODING FEATURE)
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/community-needs-assessment",
        form
      );

      setForm({
        barangay_id: "",
        officer_id: "",
        resident_name: "",
        household_id: "",
        barangay_name: "",
        municipality: "",
        need_type: "Food",
        quantity_needed: 1,
        urgency_level: "Medium",
        status: "Pending",
        notes: ""
      });

      fetchAssessments();

    } catch (error) {
      console.error(error);
    }
  };

  // =====================================
  // BADGE COLOR HELPERS (visual only)
  // =====================================

  const urgencyColors = {
    Low: { bg: "#dbeafe", color: "#1e40af" },
    Medium: { bg: "#fef9c3", color: "#854d0e" },
    High: { bg: "#ffedd5", color: "#9a3412" },
    Critical: { bg: "#fee2e2", color: "#991b1b" }
  };

  const statusColors = {
    Pending: { bg: "#fef3c7", color: "#92400e" },
    "In Progress": { bg: "#dbeafe", color: "#1e40af" },
    Resolved: { bg: "#d1fae5", color: "#065f46" },
    Completed: { bg: "#d1fae5", color: "#065f46" }
  };

  const getUrgencyStyle = (level) =>
    urgencyColors[level] || { bg: "#e2e8f0", color: "#334155" };

  const getStatusStyle = (status) =>
    statusColors[status] || { bg: "#e2e8f0", color: "#334155" };

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
            Community Needs Assessment
          </h1>
          <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#a7f3d0", opacity: 0.9 }}>
            Field Encoding & Household Needs Tracking
          </p>
        </div>
      </div>

      <StaffHeader />
      <StaffNavbar />

      <div style={{ padding: "40px max(20px, 4%)" }}>

        {/* ===================== FORM SECTION ===================== */}
        <div style={sectionStyle}>
          <h2 style={sectionHeaderStyle}>📝 Encode New Assessment</h2>
          <p style={{ margin: "4px 0 20px 0", color: "#64748b", fontSize: "14px" }}>
            Record resident household needs identified during field visits.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
              marginTop: "8px"
            }}
          >

            <div>
              <label style={labelStyle}>Barangay ID</label>
              <input
                name="barangay_id"
                placeholder="Barangay ID"
                value={form.barangay_id}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Officer ID</label>
              <input
                name="officer_id"
                placeholder="Officer ID"
                value={form.officer_id}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Resident Name</label>
              <input
                name="resident_name"
                placeholder="Resident Name"
                value={form.resident_name}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Household ID</label>
              <input
                name="household_id"
                placeholder="Household ID"
                value={form.household_id}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Barangay Name</label>
              <input
                name="barangay_name"
                placeholder="Barangay Name"
                value={form.barangay_name}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Municipality</label>
              <input
                name="municipality"
                placeholder="Municipality"
                value={form.municipality}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Need Type</label>
              <select
                name="need_type"
                value={form.need_type}
                onChange={handleChange}
                style={inputStyle}
              >
                <option>Food</option>
                <option>Water</option>
                <option>Medicine</option>
                <option>Clothing</option>
                <option>Shelter</option>
                <option>Hygiene Kits</option>
                <option>Others</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Quantity Needed</label>
              <input
                type="number"
                name="quantity_needed"
                value={form.quantity_needed}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Urgency Level</label>
              <select
                name="urgency_level"
                value={form.urgency_level}
                onChange={handleChange}
                style={inputStyle}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Notes</label>
              <textarea
                name="notes"
                placeholder="Additional notes or observations..."
                rows="3"
                value={form.notes}
                onChange={handleChange}
                style={{ ...inputStyle, resize: "none" }}
              />
            </div>

            <button
              type="submit"
              style={{
                gridColumn: "1 / -1",
                background: "#059669",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "14px",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => (e.target.style.background = "#047857")}
              onMouseLeave={(e) => (e.target.style.background = "#059669")}
            >
              Submit Assessment →
            </button>

          </form>
        </div>

        {/* ===================== LIST SECTION ===================== */}
        <div style={sectionStyle}>
          <h2 style={sectionHeaderStyle}>📋 Encoded Assessments</h2>
          <p style={{ margin: "4px 0 20px 0", color: "#64748b", fontSize: "14px" }}>
            All household needs assessments submitted so far.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "16px"
            }}
          >

            {assessments.map((item) => {
              const urgencyStyle = getUrgencyStyle(item.urgency_level);
              const statusStyle = getStatusStyle(item.status);

              return (
                <div
                  key={item.assessment_id}
                  style={{
                    background: "#ffffff",
                    borderRadius: "14px",
                    padding: "16px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>
                      {item.resident_name}
                    </h4>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "700",
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.color,
                      whiteSpace: "nowrap"
                    }}>
                      ● {item.status}
                    </span>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      background: "#e2e8f0",
                      color: "#334155",
                      padding: "3px 8px",
                      borderRadius: "6px"
                    }}>
                      {item.need_type}
                    </span>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      background: urgencyStyle.bg,
                      color: urgencyStyle.color,
                      padding: "3px 8px",
                      borderRadius: "6px"
                    }}>
                      {item.urgency_level} urgency
                    </span>
                  </div>

                  <div style={{ background: "#f8fafc", padding: "8px 12px", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "12.5px", color: "#334155" }}>
                      <b>Quantity:</b> {item.quantity_needed}
                    </span>
                    <span style={{ fontSize: "12.5px", color: "#334155" }}>
                      <b>Notes:</b> {item.notes || "—"}
                    </span>
                  </div>

                  <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
                    {new Date(item.encoded_at).toLocaleString()}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </div>

      <StaffFooter />

    </div>
  );
};

// =====================================
// DESIGN SYSTEM STYLES
// =====================================

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

export default CommunityNeedsAssessment;

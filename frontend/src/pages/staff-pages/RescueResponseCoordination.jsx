import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import StaffHeader from "../../components/StaffHeader";
import StaffNavbar from "../../components/StaffNavbar";
import StaffFooter from "../../components/StaffFooter";

const RescueResponseCoordination = () => {

  const [records, setRecords] =
    useState([]);

  const [form, setForm] =
    useState({

      barangay_id: "",
      officer_id: "",

      barangay_name: "",
      municipality: "",

      incident_id: "",

      operation_title: "",
      response_type: "Rescue Operation",

      affected_area: "",

      personnel_needed: 1,
      equipment_needed: "",

      support_request: "",

      progress_status: "Pending",
      urgency_level: "Medium",

      contact_person: "",
      contact_number: "",

      remarks: ""

    });

  useEffect(() => {

    fetchRecords();

  }, []);

  // =====================================
  // FETCH
  // =====================================

  const fetchRecords = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/rescue-response-coordination"
        );

      setRecords(response.data);

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
      [e.target.name]:
        e.target.value
    });

  };

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/rescue-response-coordination",
        form
      );

      fetchRecords();

      setForm({

        barangay_id: "",
        officer_id: "",

        barangay_name: "",
        municipality: "",

        incident_id: "",

        operation_title: "",
        response_type: "Rescue Operation",

        affected_area: "",

        personnel_needed: 1,
        equipment_needed: "",

        support_request: "",

        progress_status: "Pending",
        urgency_level: "Medium",

        contact_person: "",
        contact_number: "",

        remarks: ""

      });

    } catch (error) {

      console.error(error);

    }

  };

  // =====================================
  // STATUS BADGE STYLE (visual only)
  // =====================================

  const getStatusBadgeStyle = (status) => {

    switch (status) {

      case "Completed":
        return { bg: "#d1fae5", color: "#065f46" };

      case "In Progress":
        return { bg: "#dbeafe", color: "#1e40af" };

      case "Cancelled":
        return { bg: "#fee2e2", color: "#991b1b" };

      default:
        return { bg: "#fef3c7", color: "#92400e" };

    }

  };

  // =====================================
  // URGENCY BADGE STYLE (visual only)
  // =====================================

  const getUrgencyBadgeStyle = (level) => {

    switch (level) {

      case "Critical":
        return { bg: "#fee2e2", color: "#991b1b" };

      case "High":
        return { bg: "#ffedd5", color: "#9a3412" };

      case "Medium":
        return { bg: "#fef9c3", color: "#854d0e" };

      default:
        return { bg: "#dbeafe", color: "#1e40af" };

    }

  };

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
            Rescue & Response Coordination
          </h1>
          <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#a7f3d0", opacity: 0.9 }}>
            Coordinate rescue operations, personnel, and equipment across barangays
          </p>
        </div>
      </div>

      <StaffHeader />

      <StaffNavbar />

      <div style={{ padding: "40px max(20px, 4%)" }}>

        {/* FORM */}
        <div style={sectionStyle}>

          <h2 style={sectionHeaderStyle}>🚁 New Coordination Request</h2>
          <p style={{ margin: "4px 0 20px 0", color: "#64748b", fontSize: "14px" }}>
            Request personnel, equipment, or support for an ongoing operation.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px"
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
              <label style={labelStyle}>Incident ID</label>
              <input
                name="incident_id"
                placeholder="Incident ID"
                value={form.incident_id}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Operation Title</label>
              <input
                name="operation_title"
                placeholder="Operation Title"
                value={form.operation_title}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Response Type</label>
              <select
                name="response_type"
                value={form.response_type}
                onChange={handleChange}
                style={inputStyle}
              >

                <option>
                  Rescue Operation
                </option>

                <option>
                  Evacuation Assistance
                </option>

                <option>
                  Medical Response
                </option>

                <option>
                  Relief Deployment
                </option>

                <option>
                  Search and Rescue
                </option>

                <option>
                  Emergency Transport
                </option>

                <option>
                  Others
                </option>

              </select>
            </div>

            <div>
              <label style={labelStyle}>Affected Area</label>
              <input
                name="affected_area"
                placeholder="Affected Area"
                value={form.affected_area}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Personnel Needed</label>
              <input
                type="number"
                name="personnel_needed"
                placeholder="Personnel Needed"
                value={form.personnel_needed}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Equipment Needed</label>
              <input
                name="equipment_needed"
                placeholder="Equipment Needed"
                value={form.equipment_needed}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Support Request</label>
              <textarea
                name="support_request"
                placeholder="Support Request"
                rows="3"
                value={form.support_request}
                onChange={handleChange}
                style={{ ...inputStyle, resize: "none" }}
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

                <option>
                  Low
                </option>

                <option>
                  Medium
                </option>

                <option>
                  High
                </option>

                <option>
                  Critical
                </option>

              </select>
            </div>

            <div>
              <label style={labelStyle}>Contact Person</label>
              <input
                name="contact_person"
                placeholder="Contact Person"
                value={form.contact_person}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Contact Number</label>
              <input
                name="contact_number"
                placeholder="Contact Number"
                value={form.contact_number}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Remarks</label>
              <textarea
                name="remarks"
                placeholder="Remarks"
                rows="3"
                value={form.remarks}
                onChange={handleChange}
                style={{ ...inputStyle, resize: "none" }}
              />
            </div>

            <button
              type="submit"
              style={{
                gridColumn: "1 / -1",
                background: "#dc2626",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "14px",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => (e.target.style.background = "#b91c1c")}
              onMouseLeave={(e) => (e.target.style.background = "#dc2626")}
            >
              Submit Coordination Request →
            </button>

          </form>

        </div>

        {/* RECORDS */}
        <div style={sectionStyle}>

          <h2 style={sectionHeaderStyle}>📡 Coordination Records</h2>
          <p style={{ margin: "4px 0 20px 0", color: "#64748b", fontSize: "14px" }}>
            All active and past rescue/response coordination requests.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px"
            }}
          >

            {records.map((item) => {

              const statusBadge = getStatusBadgeStyle(item.progress_status);
              const urgencyBadge = getUrgencyBadgeStyle(item.urgency_level);

              return (

                <div
                  key={item.coordination_id}
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.02)",
                    padding: "18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                  }}
                >

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>
                      {item.operation_title}
                    </h3>

                    <span style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "700",
                      backgroundColor: statusBadge.bg,
                      color: statusBadge.color,
                      whiteSpace: "nowrap"
                    }}>
                      ● {item.progress_status}
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
                      {item.response_type}
                    </span>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      background: urgencyBadge.bg,
                      color: urgencyBadge.color,
                      padding: "3px 8px",
                      borderRadius: "6px"
                    }}>
                      {item.urgency_level} urgency
                    </span>
                  </div>

                  <div style={{ background: "#f8fafc", padding: "10px 12px", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "13px", color: "#334155" }}>
                      <strong>Area:</strong> {item.affected_area}
                    </span>
                    <span style={{ fontSize: "13px", color: "#334155" }}>
                      <strong>Support:</strong> {item.support_request}
                    </span>
                  </div>

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

export default RescueResponseCoordination;

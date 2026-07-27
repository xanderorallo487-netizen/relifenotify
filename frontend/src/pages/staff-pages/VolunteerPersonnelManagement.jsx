import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import StaffHeader from "../../components/StaffHeader";
import StaffNavbar from "../../components/StaffNavbar";
import StaffFooter from "../../components/StaffFooter";

const VolunteerPersonnelManagement = () => {

  const [personnel, setPersonnel] =
    useState([]);

  const [form, setForm] =
    useState({

      barangay_id: "",
      officer_id: "",

      barangay_name: "",
      municipality: "",

      full_name: "",

      role_type: "Volunteer",

      contact_number: "",

      assigned_task: "",

      availability_status: "Available",

      deployment_area: "",

      shift_schedule: "",

      skills: "",

      remarks: ""

    });

  useEffect(() => {

    fetchPersonnel();

  }, []);

  // =====================================
  // FETCH
  // =====================================

  const fetchPersonnel = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/volunteer-personnel-management"
        );

      setPersonnel(response.data);

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
        "http://localhost:5000/api/volunteer-personnel-management",
        form
      );

      fetchPersonnel();

      setForm({

        barangay_id: "",
        officer_id: "",

        barangay_name: "",
        municipality: "",

        full_name: "",

        role_type: "Volunteer",

        contact_number: "",

        assigned_task: "",

        availability_status: "Available",

        deployment_area: "",

        shift_schedule: "",

        skills: "",

        remarks: ""

      });

    } catch (error) {

      console.error(error);

    }

  };

  // =====================================
  // STATUS COLOR
  // =====================================

  const getStatusColor = (status) => {

    switch (status) {

      case "Available":
        return "#16a34a";

      case "On Duty":
        return "#2563eb";

      case "Unavailable":
        return "#dc2626";

      case "Deployed":
        return "#f59e0b";

      default:
        return "#64748b";

    }

  };

  // =====================================
  // STATUS BADGE BACKGROUND (visual only)
  // =====================================

  const getStatusBadgeBg = (status) => {

    switch (status) {

      case "Available":
        return "#dcfce7";

      case "On Duty":
        return "#dbeafe";

      case "Unavailable":
        return "#fee2e2";

      case "Deployed":
        return "#fef3c7";

      default:
        return "#e2e8f0";

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
            Volunteer & Personnel Management
          </h1>
          <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#a7f3d0", opacity: 0.9 }}>
            Register and track volunteers, responders, and support staff
          </p>
        </div>
      </div>

      <StaffHeader />

      <StaffNavbar />

      <div style={{ padding: "40px max(20px, 4%)" }}>

        {/* TOP SECTION */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "350px 1fr",
            gap: "32px"
          }}
        >

          {/* LEFT FORM PANEL */}

          <div
            style={{
              ...sectionStyle,
              height: "fit-content",
              marginBottom: 0
            }}
          >

            <h2 style={sectionHeaderStyle}>🧑‍🤝‍🧑 Add Personnel</h2>
            <p style={{ margin: "4px 0 20px 0", color: "#64748b", fontSize: "14px" }}>
              Register a new volunteer or response team member.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
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
                <label style={labelStyle}>Full Name</label>
                <input
                  name="full_name"
                  placeholder="Full Name"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Role Type</label>
                <select
                  name="role_type"
                  value={form.role_type}
                  onChange={handleChange}
                  style={inputStyle}
                >

                  <option>
                    Volunteer
                  </option>

                  <option>
                    Responder
                  </option>

                  <option>
                    Medical Staff
                  </option>

                  <option>
                    Rescue Personnel
                  </option>

                  <option>
                    Security
                  </option>

                  <option>
                    Logistics
                  </option>

                  <option>
                    Coordinator
                  </option>

                </select>
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

              <div>
                <label style={labelStyle}>Assigned Task</label>
                <input
                  name="assigned_task"
                  placeholder="Assigned Task"
                  value={form.assigned_task}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Availability Status</label>
                <select
                  name="availability_status"
                  value={form.availability_status}
                  onChange={handleChange}
                  style={inputStyle}
                >

                  <option>
                    Available
                  </option>

                  <option>
                    On Duty
                  </option>

                  <option>
                    Unavailable
                  </option>

                  <option>
                    Deployed
                  </option>

                </select>
              </div>

              <div>
                <label style={labelStyle}>Deployment Area</label>
                <input
                  name="deployment_area"
                  placeholder="Deployment Area"
                  value={form.deployment_area}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Shift Schedule</label>
                <input
                  name="shift_schedule"
                  placeholder="Shift Schedule"
                  value={form.shift_schedule}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Skills</label>
                <textarea
                  name="skills"
                  placeholder="Skills"
                  rows="2"
                  value={form.skills}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>

              <div>
                <label style={labelStyle}>Remarks</label>
                <textarea
                  name="remarks"
                  placeholder="Remarks"
                  rows="2"
                  value={form.remarks}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>

              <button
                type="submit"
                style={{
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
                Add Personnel →
              </button>

            </form>

          </div>

          {/* RIGHT PERSONNEL BOARD */}

          <div style={sectionStyle}>

            <h2 style={sectionHeaderStyle}>🗂️ Personnel Board</h2>
            <p style={{ margin: "4px 0 20px 0", color: "#64748b", fontSize: "14px" }}>
              Current availability and deployment status of all registered personnel.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px"
              }}
            >

              {personnel.map((item) => (

                <div
                  key={item.personnel_id}
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.02)",
                    padding: "18px",
                    borderTop:
                      `6px solid ${getStatusColor(
                        item.availability_status
                      )}`
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "flex-start",
                      marginBottom: "10px"
                    }}
                  >

                    <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>
                      {item.full_name}
                    </h3>

                    <span
                      style={{
                        background:
                          getStatusBadgeBg(
                            item.availability_status
                          ),

                        color:
                          getStatusColor(
                            item.availability_status
                          ),

                        padding:
                          "4px 10px",

                        borderRadius:
                          "20px",

                        fontSize: "11px",

                        fontWeight: "700",

                        whiteSpace: "nowrap"
                      }}
                    >
                      ● {
                        item.availability_status
                      }
                    </span>

                  </div>

                  <span style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    background: "#e2e8f0",
                    color: "#334155",
                    padding: "3px 8px",
                    borderRadius: "6px"
                  }}>
                    {item.role_type}
                  </span>

                  <div style={{ background: "#f8fafc", padding: "10px 12px", borderRadius: "8px", marginTop: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>

                    <p style={{ margin: 0, fontSize: "13px", color: "#334155" }}>
                      <strong>
                        Task:
                      </strong>{" "}
                      {item.assigned_task}
                    </p>

                    <p style={{ margin: 0, fontSize: "13px", color: "#334155" }}>
                      <strong>
                        Area:
                      </strong>{" "}
                      {item.deployment_area}
                    </p>

                    <p style={{ margin: 0, fontSize: "13px", color: "#334155" }}>
                      <strong>
                        Shift:
                      </strong>{" "}
                      {item.shift_schedule}
                    </p>

                    <p style={{ margin: 0, fontSize: "13px", color: "#334155" }}>
                      <strong>
                        Skills:
                      </strong>{" "}
                      {item.skills}
                    </p>

                    <p style={{ margin: 0, fontSize: "13px", color: "#334155" }}>
                      <strong>
                        Contact:
                      </strong>{" "}
                      {item.contact_number}
                    </p>

                  </div>

                </div>

              ))}

            </div>

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

export default VolunteerPersonnelManagement;

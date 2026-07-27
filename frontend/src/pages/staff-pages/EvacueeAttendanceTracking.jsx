import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import StaffHeader from "../../components/StaffHeader";
import StaffNavbar from "../../components/StaffNavbar";
import StaffFooter from "../../components/StaffFooter";

const EvacueeAttendanceTracking = () => {

  const [evacuees, setEvacuees] =
    useState([]);

  const [form, setForm] =
    useState({

      barangay_id: "",
      officer_id: "",

      evacuee_name: "",
      family_head: "",

      evacuation_center: "",

      qr_code: "",

      gender: "Male",

      age: "",

      contact_number: "",

      status: "Inside",

      remarks: ""

    });

  useEffect(() => {

    fetchEvacuees();

  }, []);

  // =====================================
  // FETCH
  // =====================================

  const fetchEvacuees = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/evacuee-attendance-tracking"
        );

      setEvacuees(response.data);

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
  // CHECK IN
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/evacuee-attendance-tracking",
        form
      );

      fetchEvacuees();

      setForm({

        barangay_id: "",
        officer_id: "",

        evacuee_name: "",
        family_head: "",

        evacuation_center: "",

        qr_code: "",

        gender: "Male",

        age: "",

        contact_number: "",

        status: "Inside",

        remarks: ""

      });

    } catch (error) {

      console.error(error);

    }

  };

  // =====================================
  // UPDATE STATUS
  // =====================================

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.put(
        `http://localhost:5000/api/evacuee-attendance-tracking/${id}`,
        {

          status,
          remarks:
            `Updated to ${status}`

        }
      );

      fetchEvacuees();

    } catch (error) {

      console.error(error);

    }

  };

  // =====================================
  // STATUS COLOR
  // =====================================

  const getColor = (status) => {

    switch (status) {

      case "Inside":
        return "#16a34a";

      case "Checked Out":
        return "#dc2626";

      case "Transferred":
        return "#2563eb";

      case "Missing":
        return "#f59e0b";

      default:
        return "#64748b";

    }

  };

  // =====================================
  // STATUS BADGE STYLE (visual only)
  // =====================================

  const getStatusBadgeStyle = (status) => {

    const color = getColor(status);

    return {
      color,
      background: `${color}1a`
    };

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
            Evacuee Attendance & Tracking
          </h1>
          <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#a7f3d0", opacity: 0.9 }}>
            Monitor evacuees entering and leaving evacuation centers using QR and attendance tracking.
          </p>
        </div>
      </div>

      <StaffHeader />

      <StaffNavbar />

      <div style={{ padding: "40px max(20px, 4%)" }}>

        {/* TOP GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "380px 1fr",
            gap: "32px"
          }}
        >

          {/* CHECK-IN PANEL */}

          <div
            style={{
              ...sectionStyle,
              height: "fit-content",
              marginBottom: 0
            }}
          >

            <h2 style={sectionHeaderStyle}>🧾 Evacuee Check-In</h2>
            <p style={{ margin: "4px 0 20px 0", color: "#64748b", fontSize: "14px" }}>
              Register a new evacuee arriving at a center.
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
                <label style={labelStyle}>Evacuee Name</label>
                <input
                  name="evacuee_name"
                  placeholder="Evacuee Name"
                  value={form.evacuee_name}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Family Head</label>
                <input
                  name="family_head"
                  placeholder="Family Head"
                  value={form.family_head}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Evacuation Center</label>
                <input
                  name="evacuation_center"
                  placeholder="Evacuation Center"
                  value={form.evacuation_center}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>QR Code</label>
                <input
                  name="qr_code"
                  placeholder="QR Code"
                  value={form.qr_code}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  style={inputStyle}
                >

                  <option>
                    Male
                  </option>

                  <option>
                    Female
                  </option>

                </select>
              </div>

              <div>
                <label style={labelStyle}>Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={form.age}
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

              <div>
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
                Check In Evacuee →
              </button>

            </form>

          </div>

          {/* ATTENDANCE BOARD */}

          <div style={sectionStyle}>

            <h2 style={sectionHeaderStyle}>📋 Attendance Board</h2>
            <p style={{ margin: "4px 0 20px 0", color: "#64748b", fontSize: "14px" }}>
              Live status of all checked-in evacuees.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px"
              }}
            >

              {evacuees.map((item) => {

                const badgeStyle = getStatusBadgeStyle(item.status);

                return (

                  <div
                    key={item.attendance_id}
                    style={{
                      background: "#ffffff",
                      borderRadius: "16px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.02)",
                      padding: "20px",
                      borderTop:
                        `6px solid ${getColor(
                          item.status
                        )}`
                    }}
                  >

                    {/* QR DISPLAY */}

                    <div
                      style={{
                        background: "#f8fafc",
                        padding: "15px",
                        borderRadius: "10px",
                        textAlign: "center",
                        marginBottom: "16px",
                        border: "1px solid #e2e8f0"
                      }}
                    >

                      <h2
                        style={{
                          margin: 0,
                          fontSize: "20px",
                          fontWeight: "800",
                          color: "#0f172a"
                        }}
                      >
                        {item.qr_code}
                      </h2>

                      <p
                        style={{
                          margin: 0,
                          color: "#64748b",
                          fontSize: "12px",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px"
                        }}
                      >
                        Digital Attendance ID
                      </p>

                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                      <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>
                        {item.evacuee_name}
                      </h3>

                      <span style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: "700",
                        ...badgeStyle,
                        whiteSpace: "nowrap"
                      }}>
                        ● {item.status}
                      </span>
                    </div>

                    <div style={{ background: "#f8fafc", padding: "10px 12px", borderRadius: "8px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "4px" }}>

                      <p style={{ margin: 0, fontSize: "13px", color: "#334155" }}>
                        <strong>
                          Center:
                        </strong>{" "}
                        {
                          item.evacuation_center
                        }
                      </p>

                      <p style={{ margin: 0, fontSize: "13px", color: "#334155" }}>
                        <strong>
                          Family Head:
                        </strong>{" "}
                        {item.family_head}
                      </p>

                      <p style={{ margin: 0, fontSize: "13px", color: "#334155" }}>
                        <strong>
                          Age:
                        </strong>{" "}
                        {item.age}
                      </p>

                      <p style={{ margin: 0, fontSize: "13px", color: "#334155" }}>
                        <strong>
                          Check-In:
                        </strong>{" "}
                        {new Date(
                          item.check_in_time
                        ).toLocaleString()}
                      </p>

                    </div>

                    {/* ACTIONS */}

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        marginTop: "16px"
                      }}
                    >

                      <button
                        onClick={() =>
                          updateStatus(
                            item.attendance_id,
                            "Inside"
                          )
                        }
                        style={{ ...actionBtnStyle, background: "#ecfdf5", color: "#065f46", border: "1px solid #a7f3d0" }}
                      >
                        Inside
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            item.attendance_id,
                            "Checked Out"
                          )
                        }
                        style={{ ...actionBtnStyle, background: "#fef2f2", color: "#991b1b", border: "1px solid #fca5a5" }}
                      >
                        Check Out
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            item.attendance_id,
                            "Transferred"
                          )
                        }
                        style={{ ...actionBtnStyle, background: "#eff6ff", color: "#1e40af", border: "1px solid #bfdbfe" }}
                      >
                        Transfer
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            item.attendance_id,
                            "Missing"
                          )
                        }
                        style={{ ...actionBtnStyle, background: "#fffbeb", color: "#92400e", border: "1px solid #fde68a" }}
                      >
                        Missing
                      </button>

                    </div>

                  </div>

                );

              })}

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

const actionBtnStyle = {
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "12px",
  transition: "all 0.15s ease"
};

export default EvacueeAttendanceTracking;

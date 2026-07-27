import React, { useEffect, useState } from "react";
import axios from "axios";

import StaffHeader from "../../components/StaffHeader";
import StaffNavbar from "../../components/StaffNavbar";
import StaffFooter from "../../components/StaffFooter";

const IncidentReports = () => {

  const [incidents, setIncidents] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [editStatus, setEditStatus] =
    useState("");

  // IMAGE MODAL
  const [selectedImage, setSelectedImage] =
    useState(null);

  useEffect(() => {

    fetchIncidents();

  }, []);

  // =====================================
  // FETCH INCIDENTS
  // =====================================

  const fetchIncidents = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/incident-reports"
        );

      setIncidents(response.data);

    }
    catch (error) {

      console.error(error);

    }

  };

  // =====================================
  // START EDIT
  // =====================================

  const handleEdit = (
    id,
    currentStatus
  ) => {

    setEditingId(id);

    setEditStatus(currentStatus);

  };

  // =====================================
  // SAVE STATUS
  // =====================================

  const handleSave = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/incident-reports/${id}/status`,
        {
          status: editStatus
        }
      );

      setEditingId(null);

      fetchIncidents();

      alert(
        "Incident status updated successfully"
      );

    }
    catch (error) {

      console.error(error);

      alert(
        "Failed to update incident"
      );

    }

  };

  // =====================================
  // STATUS BADGE STYLE (visual only)
  // =====================================

  const getStatusBadgeStyle = (status) => {

    switch (status) {

      case "Resolved":
        return { bg: "#d1fae5", color: "#065f46" };

      case "Ongoing":
        return { bg: "#ffedd5", color: "#9a3412" };

      case "Pending":
        return { bg: "#fee2e2", color: "#991b1b" };

      default:
        return { bg: "#e2e8f0", color: "#334155" };

    }

  };

  // =====================================
  // SEVERITY BADGE STYLE (visual only)
  // =====================================

  const getSeverityBadgeStyle = (severity) => {

    switch (severity) {

      case "Critical":
        return { bg: "#fee2e2", color: "#991b1b" };

      case "High":
        return { bg: "#ffedd5", color: "#9a3412" };

      case "Medium":
        return { bg: "#fef9c3", color: "#854d0e" };

      case "Low":
        return { bg: "#dbeafe", color: "#1e40af" };

      default:
        return { bg: "#e2e8f0", color: "#334155" };

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
            Incident Report Management
          </h1>
          <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#a7f3d0", opacity: 0.9 }}>
            Review, verify, and update the status of submitted reports
          </p>
        </div>
      </div>

      {/* HEADER */}
      <StaffHeader />

      {/* NAVBAR */}
      <StaffNavbar />

      {/* CONTENT */}
      <div style={{ padding: "40px max(20px, 4%)" }}>

        <div style={sectionStyle}>

          <h2 style={sectionHeaderStyle}>📑 All Incident Reports</h2>
          <p style={{ margin: "4px 0 20px 0", color: "#64748b", fontSize: "14px" }}>
            Full record of encoded incidents with photo verification and status control.
          </p>

          {/* TABLE WRAPPER */}
          <div
            style={{
              overflowX: "auto",
              borderRadius: "14px",
              border: "1px solid #e2e8f0"
            }}
          >

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "13.5px"
              }}
            >

              <thead>

                <tr
                  style={{
                    background: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)",
                    color: "white"
                  }}
                >

                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Barangay ID</th>
                  <th style={thStyle}>Officer ID</th>
                  <th style={thStyle}>Incident Type</th>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Description</th>
                  <th style={thStyle}>Location</th>
                  <th style={thStyle}>Latitude</th>
                  <th style={thStyle}>Longitude</th>
                  <th style={thStyle}>Photo</th>
                  <th style={thStyle}>Severity</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Reported At</th>
                  <th style={thStyle}>Updated At</th>
                  <th style={thStyle}>Actions</th>

                </tr>

              </thead>

              <tbody>

                {incidents.map((incident, index) => {

                  const isEditing =
                    editingId === incident.incident_id;

                  const statusBadge =
                    getStatusBadgeStyle(
                      isEditing ? editStatus : incident.status
                    );

                  const severityBadge =
                    getSeverityBadgeStyle(incident.severity);

                  return (

                    <tr
                      key={
                        incident.incident_id
                      }
                      style={{
                        background: index % 2 === 0 ? "#ffffff" : "#f8fafc"
                      }}
                    >

                      <td style={tdStyle}>
                        {
                          incident.incident_id
                        }
                      </td>

                      <td style={tdStyle}>
                        {
                          incident.barangay_id
                        }
                      </td>

                      <td style={tdStyle}>
                        {
                          incident.officer_id
                        }
                      </td>

                      <td style={tdStyle}>
                        {
                          incident.incident_type
                        }
                      </td>

                      <td style={{ ...tdStyle, fontWeight: "700", color: "#0f172a" }}>
                        {incident.title}
                      </td>

                      <td style={tdStyle}>
                        {
                          incident.description
                        }
                      </td>

                      <td style={tdStyle}>
                        {
                          incident.location
                        }
                      </td>

                      <td style={tdStyle}>
                        {
                          incident.latitude
                        }
                      </td>

                      <td style={tdStyle}>
                        {
                          incident.longitude
                        }
                      </td>

                      {/* PHOTO */}
                      <td style={tdStyle}>

                        {incident.photo ? (

                          <img
                            src={`http://localhost:5000/uploads/${incident.photo}`}
                            alt="Incident"
                            onClick={() =>
                              setSelectedImage(
                                `http://localhost:5000/uploads/${incident.photo}`
                              )
                            }
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              cursor: "pointer",
                              border:
                                "2px solid #e2e8f0"
                            }}
                          />

                        ) : (

                          <span style={{ color: "#94a3b8", fontSize: "12px" }}>No Image</span>

                        )}

                      </td>

                      <td style={tdStyle}>
                        <span style={{
                          padding: "3px 8px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: "700",
                          background: severityBadge.bg,
                          color: severityBadge.color
                        }}>
                          {
                            incident.severity
                          }
                        </span>
                      </td>

                      {/* STATUS */}
                      <td style={tdStyle}>

                        {isEditing ? (

                          <select
                            value={
                              editStatus
                            }
                            onChange={(e) =>
                              setEditStatus(
                                e.target.value
                              )
                            }
                            style={selectStyle}
                          >

                            <option>
                              Pending
                            </option>

                            <option>
                              Ongoing
                            </option>

                            <option>
                              Resolved
                            </option>

                          </select>

                        ) : (

                          <span style={{
                            padding: "4px 10px",
                            borderRadius: "20px",
                            fontSize: "11px",
                            fontWeight: "700",
                            background: statusBadge.bg,
                            color: statusBadge.color,
                            whiteSpace: "nowrap"
                          }}>
                            ● {incident.status}
                          </span>

                        )}

                      </td>

                      <td style={tdStyle}>
                        {new Date(
                          incident.reported_at
                        ).toLocaleString()}
                      </td>

                      <td style={tdStyle}>
                        {new Date(
                          incident.updated_at
                        ).toLocaleString()}
                      </td>

                      {/* ACTIONS */}
                      <td style={tdStyle}>

                        {isEditing ? (

                          <button
                            onClick={() =>
                              handleSave(
                                incident.incident_id
                              )
                            }
                            style={{ ...actionBtnStyle, background: "#ecfdf5", color: "#065f46", border: "1px solid #a7f3d0" }}
                          >
                            Save
                          </button>

                        ) : (

                          <button
                            onClick={() =>
                              handleEdit(
                                incident.incident_id,
                                incident.status
                              )
                            }
                            style={{ ...actionBtnStyle, background: "#eff6ff", color: "#1e40af", border: "1px solid #bfdbfe" }}
                          >
                            Edit
                          </button>

                        )}

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* IMAGE MODAL */}
      {selectedImage && (

        <div
          onClick={() =>
            setSelectedImage(null)
          }
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
          }}
        >

          <img
            src={selectedImage}
            alt="Preview"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "12px",
              boxShadow:
                "0 0 20px rgba(255,255,255,0.3)"
            }}
          />

        </div>

      )}

      {/* FOOTER */}
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

const actionBtnStyle = {
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "12px",
  transition: "all 0.15s ease"
};

const selectStyle = {
  padding: "6px 10px",
  border: "1px solid #cbd5e1",
  borderRadius: "6px",
  fontSize: "13px",
  outline: "none",
  backgroundColor: "#f8fafc"
};

// =====================================
// TABLE STYLES
// =====================================

const thStyle = {

  padding: "14px",

  textAlign: "left",

  whiteSpace: "nowrap",

  fontSize: "12px",

  fontWeight: "700",

  textTransform: "uppercase",

  letterSpacing: "0.5px"

};

const tdStyle = {

  padding: "12px 14px",

  borderBottom:
    "1px solid #e2e8f0",

  whiteSpace: "nowrap",

  color: "#334155"

};

export default IncidentReports;

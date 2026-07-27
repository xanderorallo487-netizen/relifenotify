import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import StaffHeader from "../../components/StaffHeader";
import StaffNavbar from "../../components/StaffNavbar";
import StaffFooter from "../../components/StaffFooter";

const IncidentHistory = () => {

  const [incidents, setIncidents] =
    useState([]);

  const [filter, setFilter] =
    useState("all");

  useEffect(() => {

    fetchIncidents();

  }, [filter]);

  // =====================================
  // FETCH INCIDENTS
  // =====================================

  const fetchIncidents = async () => {

    try {

      let url =
        "http://localhost:5000/api/incident-reports";

      if (filter !== "all") {

        url =
          `http://localhost:5000/api/incident-reports/status/${filter}`;

      }

      const response =
        await axios.get(url);

      setIncidents(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  // =====================================
  // STATUS COLOR
  // =====================================

  const getStatusColor = (status) => {

    switch (status) {

      case "Resolved":
        return "#16a34a";

      case "Ongoing":
        return "#f59e0b";

      case "Pending":
        return "#dc2626";

      default:
        return "#64748b";

    }

  };

  // =====================================
  // STATUS BADGE STYLE (visual only)
  // =====================================

  const getStatusBadgeStyle = (status) => {

    const color = getStatusColor(status);

    return {
      color,
      background: `${color}1a`
    };

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
            Incident History & Reports
          </h1>
          <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#a7f3d0", opacity: 0.9 }}>
            Browse and filter all reported incidents
          </p>
        </div>
      </div>

      <StaffHeader />

      <StaffNavbar />

      <div style={{ padding: "40px max(20px, 4%)" }}>

        <div style={sectionStyle}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>

            <div>
              <h2 style={sectionHeaderStyle}>🕓 Reported Incidents</h2>
              <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "14px" }}>
                Review incident reports and filter by current status.
              </p>
            </div>

            {/* FILTER */}
            <div>
              <label style={labelStyle}>Filter by Status</label>
              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value)
                }
                style={{ ...inputStyle, width: "220px" }}
              >

                <option value="all">
                  All
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Ongoing">
                  Ongoing
                </option>

                <option value="Resolved">
                  Resolved
                </option>

              </select>
            </div>

          </div>

          {/* INCIDENT GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px"
            }}
          >

            {incidents.map((incident) => {

              const statusBadge = getStatusBadgeStyle(incident.status);
              const severityBadge = getSeverityBadgeStyle(incident.severity_level);

              return (

                <div
                  key={
                    incident.incident_id
                  }
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
                      {incident.title}
                    </h3>

                    <span style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "700",
                      ...statusBadge,
                      whiteSpace: "nowrap"
                    }}>
                      ● {incident.status}
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
                      {incident.incident_type}
                    </span>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      background: severityBadge.bg,
                      color: severityBadge.color,
                      padding: "3px 8px",
                      borderRadius: "6px"
                    }}>
                      {incident.severity_level} severity
                    </span>
                  </div>

                  <div style={{ background: "#f8fafc", padding: "10px 12px", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>

                    <p style={{ margin: 0, fontSize: "13px", color: "#334155" }}>
                      <strong>
                        Description:
                      </strong>{" "}
                      {
                        incident.description
                      }
                    </p>

                    <p style={{ margin: 0, fontSize: "13px", color: "#334155" }}>
                      <strong>
                        Location:
                      </strong>{" "}
                      {
                        incident.location
                      }
                    </p>

                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "12px",
                      color: "#64748b"
                    }}
                  >
                    Reported:
                    {" "}
                    {new Date(
                      incident.reported_at
                    ).toLocaleString()}
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
  padding: "10px 14px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
  backgroundColor: "#f8fafc",
  boxSizing: "border-box"
};

export default IncidentHistory;

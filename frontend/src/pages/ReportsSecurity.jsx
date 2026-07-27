import { useEffect, useState } from "react";
import axios from "axios";

// COMPONENTS
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ReportsSecurity() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  // FETCH ANALYTICS
  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/reports/analytics"
      );

      if (response.data.success) {
        setAnalytics(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  // Maps custom statuses to vibrant, high-contrast semantic badges
  const getBadgeStyle = (status) => {
    const normalize = status?.toLowerCase() || "";
    if (["active", "claimed", "completed", "resolved"].includes(normalize)) {
      return { color: "#16a34a", bg: "#f0fdf4" };
    }
    if (["pending", "ongoing", "unclaimed"].includes(normalize)) {
      return { color: "#d97706", bg: "#fffbeb" };
    }
    return { color: "#ef4444", bg: "#fef2f2" }; // Critical/Failed/Closed status
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        <h2 style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: "#64748b", fontWeight: "500", letterSpacing: "-0.5px" }}>
          Loading Analytics...
        </h2>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* BRAND EMERALD HEADER BANNER */}
      <div 
        style={{ 
          backgroundColor: "#004421", 
          padding: "40px max(24px, 5%)",
          boxSizing: "border-box"
        }}
      >
        <h1 
          style={{ 
            margin: "0 0 6px 0", 
            fontSize: "32px", 
            fontWeight: "800", 
            color: "#ffffff",
            letterSpacing: "-0.75px"
          }}
        >
          Analytics & Reports Dashboard
        </h1>
        <p 
          style={{ 
            margin: 0, 
            fontSize: "14px", 
            color: "#cbd5e1",
            fontWeight: "400",
            letterSpacing: "-0.1px"
          }}
        >
          Real-time System Monitoring, Security Logs, and Distribution Insights
        </p>
      </div>

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT AREA */}
      <div
        style={{
          padding: "40px max(24px, 5%)",
          maxWidth: "1440px",
          margin: "0 auto",
          boxSizing: "border-box"
        }}
      >
        {/* SUMMARY METRIC CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          <div style={cardStyle}>
            <span style={cardLabelStyle}>Total Incidents</span>
            <h1 style={cardValueStyle}>{analytics.totalIncidents}</h1>
          </div>

          <div style={cardStyle}>
            <span style={cardLabelStyle}>Total Alerts</span>
            <h1 style={cardValueStyle}>{analytics.totalAlerts}</h1>
          </div>

          <div style={cardStyle}>
            <span style={cardLabelStyle}>Beneficiaries</span>
            <h1 style={cardValueStyle}>{analytics.totalBeneficiaries}</h1>
          </div>

          <div style={cardStyle}>
            <span style={cardLabelStyle}>Relief Operations</span>
            <h1 style={cardValueStyle}>{analytics.totalReliefOperations}</h1>
          </div>
        </div>

        {/* INCIDENT REPORTS */}
        <div style={sectionStyle}>
          <div style={sectionHeaderWrapper}>
            <h2 style={sectionHeaderStyle}>Incident Reports</h2>
            <p style={sectionSubheaderStyle}>Log history of local structural incidents reported across operational sectors.</p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table width="100%" style={tableStyle}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                  <th style={tableHeaderStyle}>ID</th>
                  <th style={tableHeaderStyle}>Incident Type</th>
                  <th style={tableHeaderStyle}>Barangay</th>
                  <th style={{ ...tableHeaderStyle, textAlign: "right" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {analytics.incidents.map((incident) => {
                  const badge = getBadgeStyle(incident.status);
                  return (
                    <tr key={incident.id} style={tableRowStyle} className="table-row-hover">
                      <td style={{ ...tableCellStyle, fontFamily: "monospace", color: "#64748b", fontWeight: "600" }}>
                        #{incident.id}
                      </td>
                      <td style={{ ...tableCellStyle, fontWeight: "600", color: "#0f172a" }}>
                        {incident.incident_type}
                      </td>
                      <td style={{ ...tableCellStyle, color: "#475569", fontWeight: "500" }}>
                        {incident.barangay}
                      </td>
                      <td style={{ ...tableCellStyle, textAlign: "right" }}>
                        <span style={{ ...badgeStyle, color: badge.color, backgroundColor: badge.bg }}>
                          {incident.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ALERT BROADCAST LOGS */}
        <div style={sectionStyle}>
          <div style={sectionHeaderWrapper}>
            <h2 style={sectionHeaderStyle}>Alert Broadcast Logs</h2>
            <p style={sectionSubheaderStyle}>Review system emergency dispatches broadcasted out to municipal communities.</p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table width="100%" style={tableStyle}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                  <th style={tableHeaderStyle}>Title</th>
                  <th style={tableHeaderStyle}>Type</th>
                  <th style={tableHeaderStyle}>Barangay Target</th>
                  <th style={{ ...tableHeaderStyle, textAlign: "right" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {analytics.alerts.map((alert) => {
                  const badge = getBadgeStyle(alert.status);
                  return (
                    <tr key={alert.id} style={tableRowStyle}>
                      <td style={{ ...tableCellStyle, fontWeight: "600", color: "#0f172a" }}>
                        {alert.title}
                      </td>
                      <td style={{ ...tableCellStyle, color: "#475569", fontWeight: "500" }}>
                        {alert.alert_type}
                      </td>
                      <td style={{ ...tableCellStyle, color: "#64748b" }}>
                        {alert.target_barangay}
                      </td>
                      <td style={{ ...tableCellStyle, textAlign: "right" }}>
                        <span style={{ ...badgeStyle, color: badge.color, backgroundColor: badge.bg }}>
                          {alert.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* BENEFICIARY VERIFICATION */}
        <div style={sectionStyle}>
          <div style={sectionHeaderWrapper}>
            <h2 style={sectionHeaderStyle}>Beneficiary Verification</h2>
            <p style={sectionSubheaderStyle}>Status breakdown of target family units recorded within active dispatch areas.</p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table width="100%" style={tableStyle}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                  <th style={tableHeaderStyle}>System Code</th>
                  <th style={tableHeaderStyle}>Full Name</th>
                  <th style={tableHeaderStyle}>Barangay</th>
                  <th style={{ ...tableHeaderStyle, textAlign: "right" }}>Relief Status</th>
                </tr>
              </thead>
              <tbody>
                {analytics.beneficiaries.map((beneficiary) => {
                  const badge = getBadgeStyle(beneficiary.relief_status);
                  return (
                    <tr key={beneficiary.id} style={tableRowStyle}>
                      <td style={{ ...tableCellStyle, fontFamily: "monospace", color: "#334155", fontWeight: "600" }}>
                        {beneficiary.beneficiary_code}
                      </td>
                      <td style={{ ...tableCellStyle, fontWeight: "600", color: "#0f172a" }}>
                        {beneficiary.full_name}
                      </td>
                      <td style={{ ...tableCellStyle, color: "#475569", fontWeight: "500" }}>
                        {beneficiary.barangay}
                      </td>
                      <td style={{ ...tableCellStyle, textAlign: "right" }}>
                        <span style={{ ...badgeStyle, color: badge.color, backgroundColor: badge.bg }}>
                          {beneficiary.relief_status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RELIEF DISTRIBUTION MONITORING */}
        <div style={sectionStyle}>
          <div style={sectionHeaderWrapper}>
            <h2 style={sectionHeaderStyle}>Relief Distribution Monitoring</h2>
            <p style={sectionSubheaderStyle}>Real-time allocation data mapping resource batches assigned to operating teams.</p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table width="100%" style={tableStyle}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                  <th style={tableHeaderStyle}>Operation Action Name</th>
                  <th style={tableHeaderStyle}>Barangay Hub</th>
                  <th style={tableHeaderStyle}>Relief Package Type</th>
                  <th style={tableHeaderStyle}>Quantity Units</th>
                  <th style={{ ...tableHeaderStyle, textAlign: "right" }}>Operational Status</th>
                </tr>
              </thead>
              <tbody>
                {analytics.reliefOperations.map((operation) => {
                  const badge = getBadgeStyle(operation.status);
                  return (
                    <tr key={operation.id} style={tableRowStyle}>
                      <td style={{ ...tableCellStyle, fontWeight: "600", color: "#0f172a" }}>
                        {operation.operation_name}
                      </td>
                      <td style={{ ...tableCellStyle, color: "#334155", fontWeight: "500" }}>
                        {operation.barangay}
                      </td>
                      <td style={{ ...tableCellStyle, color: "#64748b" }}>
                        {operation.relief_type}
                      </td>
                      <td style={{ ...tableCellStyle, fontWeight: "700", color: "#0f172a" }}>
                        {operation.quantity.toLocaleString()}
                      </td>
                      <td style={{ ...tableCellStyle, textAlign: "right" }}>
                        <span style={{ ...badgeStyle, color: badge.color, backgroundColor: badge.bg }}>
                          {operation.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

// =====================================
// MODULE DASHBOARD CSS STYLES
// =====================================
const cardStyle = {
  background: "#ffffff",
  padding: "24px 28px",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(15, 23, 42, 0.03), 0 4px 12px rgba(15, 23, 42, 0.04)",
  border: "1px solid #e2e8f0",
  display: "flex",
  flexDirection: "column"
};

const cardLabelStyle = {
  fontSize: "12px",
  fontWeight: "700",
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "0.75px",
  marginBottom: "6px"
};

const cardValueStyle = {
  margin: 0,
  fontSize: "36px",
  fontWeight: "800",
  color: "#0f172a",
  letterSpacing: "-1px"
};

const sectionStyle = {
  background: "#ffffff",
  padding: "32px",
  borderRadius: "16px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 3px rgba(15, 23, 42, 0.02), 0 6px 16px rgba(15, 23, 42, 0.04)",
  marginBottom: "32px",
};

const sectionHeaderWrapper = {
  marginBottom: "24px"
};

const sectionHeaderStyle = {
  margin: "0 0 4px 0",
  fontSize: "20px",
  fontWeight: "800",
  color: "#0f172a",
  letterSpacing: "-0.5px"
};

const sectionSubheaderStyle = {
  margin: 0,
  fontSize: "14px",
  color: "#64748b"
};

const tableStyle = {
  borderCollapse: "collapse",
  textAlign: "left",
  fontSize: "14px",
};

const tableHeaderStyle = {
  padding: "12px 12px",
  color: "#94a3b8",
  fontWeight: "700",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.75px"
};

const tableRowStyle = {
  borderBottom: "1px solid #f1f5f9",
};

const tableCellStyle = {
  padding: "16px 12px",
  verticalAlign: "middle",
  lineHeight: "1.5"
};

const badgeStyle = {
  fontWeight: "700",
  fontSize: "11px",
  padding: "4px 10px",
  borderRadius: "6px",
  textTransform: "uppercase",
  display: "inline-block",
  whiteSpace: "nowrap",
  letterSpacing: "0.25px"
};

export default ReportsSecurity;
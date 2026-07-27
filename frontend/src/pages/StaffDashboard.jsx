import React from "react";

import StaffHeader from "../components/StaffHeader";
import StaffNavbar from "../components/StaffNavbar";
import StaffFooter from "../components/StaffFooter";

function StaffDashboard() {

  return (

    <div
      style={{
        backgroundColor: "#f4f7f6",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column"
      }}
    >

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
            Staff Dashboard
          </h1>
          <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#a7f3d0", opacity: 0.9 }}>
            RELIEFNOTIFY Staff Emergency Management Portal
          </p>
        </div>
      </div>

      {/* HEADER */}
      <StaffHeader />

      {/* NAVBAR */}
      <StaffNavbar />

      {/* MAIN CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "40px max(20px, 4%)"
        }}
      >

        <div style={sectionStyle}>

          <h2 style={sectionHeaderStyle}>👋 Welcome</h2>

          <p
            style={{
              marginTop: "10px",
              marginBottom: 0,
              color: "#475569",
              fontSize: "15px",
              lineHeight: "1.6"
            }}
          >
            Welcome to the RELIEFNOTIFY Staff Emergency Management Portal.
          </p>

        </div>

      </div>

      {/* FOOTER */}
      <StaffFooter />

    </div>

  );

}

// =====================================
// DESIGN SYSTEM STYLES
// =====================================

const sectionStyle = {
  background: "#ffffff",
  padding: "28px",
  borderRadius: "16px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.02)"
};

const sectionHeaderStyle = {
  margin: 0,
  fontSize: "18px",
  fontWeight: "800",
  color: "#064e3b",
  letterSpacing: "-0.3px"
};

export default StaffDashboard;

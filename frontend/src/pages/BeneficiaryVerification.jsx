import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Imported for programmatic redirection

// COMPONENTS
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function BeneficiaryVerification() {
  const navigate = useNavigate(); // Initialize navigation hook
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [qrImages, setQrImages] = useState({});

  useEffect(() => {
    fetchBeneficiaries();
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

  const fetchBeneficiaries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/beneficiaries"
      );

      if (response.data.success) {
        setBeneficiaries(response.data.beneficiaries);
        generateQrCodes(response.data.beneficiaries);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const generateQrCodes = async (data) => {
    let qrMap = {};

    for (const person of data) {
      try {
        const qrResponse = await axios.get(
          `http://localhost:5000/api/beneficiaries/qr/${person.beneficiary_code}`
        );
        qrMap[person.id] = qrResponse.data.qr;
      } catch (err) {
        console.error(`Failed to load QR for: ${person.beneficiary_code}`, err);
      }
    }

    setQrImages(qrMap);
  };

  const claimRelief = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/beneficiaries/claim/${id}`
      );
      fetchBeneficiaries();
    } catch (error) {
      console.error(error);
    }
  };

  // Helper to color-code status badges
  const getStatusBadgeStyle = (status) => {
    const normalize = status?.toLowerCase() || "";
    if (normalize === "claimed") {
      return { color: "#16a34a", bg: "#f0fdf4" };
    }
    return { color: "#d97706", bg: "#fffbeb" }; // Default/Unclaimed
  };

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* BRAND EMERALD HEADER BANNER WITH SIGN OUT */}
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
            QR-Based Beneficiary Verification
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
            Verify and monitor relief beneficiaries
          </p>
        </div>

        {/* ACTIVE SIGN OUT BUTTON */}
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

      {/* NAVBAR WRAPPER */}
      <div style={{ display: "block", width: "100%" }}>
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
        {/* PANEL STRUCTURE */}
        <div
          style={{
            background: "#ffffff",
            padding: "32px",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02), 0 4px 12px rgba(0, 0, 0, 0.03)",
          }}
        >
          <h2 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.5px" }}>
            Beneficiary Roster
          </h2>
          <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#64748b" }}>
            Cross-reference generated QR tokens with local identity registry logs to dispatch packages securely.
          </p>

          <div style={{ overflowX: "auto" }}>
            <table
              width="100%"
              style={{
                borderCollapse: "collapse",
                textAlign: "left",
                fontSize: "14px"
              }}
            >
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                  <th style={tableHeaderStyle}>QR Code</th>
                  <th style={tableHeaderStyle}>Beneficiary Code</th>
                  <th style={tableHeaderStyle}>Full Name</th>
                  <th style={tableHeaderStyle}>Barangay</th>
                  <th style={tableHeaderStyle}>Contact</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={{ ...tableHeaderStyle, textAlign: "right" }}>Action Target</th>
                </tr>
              </thead>

              <tbody>
                {beneficiaries.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ padding: "32px 8px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                      No data entries recorded inside the beneficiary registry system.
                    </td>
                  </tr>
                ) : (
                  beneficiaries.map((beneficiary) => {
                    const isClaimed = beneficiary.relief_status === "Claimed";
                    const statusMeta = getStatusBadgeStyle(beneficiary.relief_status);
                    
                    return (
                      <tr
                        key={beneficiary.id}
                        style={{ 
                          borderBottom: "1px solid #f1f5f9",
                          transition: "background-color 0.1s ease"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                      >
                        <td style={{ padding: "12px 8px", verticalAlign: "middle" }}>
                          {qrImages[beneficiary.id] ? (
                            <img
                              src={qrImages[beneficiary.id]}
                              alt="QR Verification Token"
                              width="56"
                              height="56"
                              style={{ display: "block", borderRadius: "6px", border: "1px solid #e2e8f0" }}
                            />
                          ) : (
                            <div style={{ width: "56px", height: "56px", backgroundColor: "#f1f5f9", borderRadius: "6px" }} />
                          )}
                        </td>
                        <td style={{ padding: "16px 8px", fontFamily: "monospace", color: "#475569", fontWeight: "600" }}>
                          {beneficiary.beneficiary_code}
                        </td>
                        <td style={{ padding: "16px 8px", fontWeight: "700", color: "#0f172a" }}>
                          {beneficiary.full_name}
                        </td>
                        <td style={{ padding: "16px 8px", color: "#334155", fontWeight: "500" }}>
                          {beneficiary.barangay}
                        </td>
                        <td style={{ padding: "16px 8px", color: "#64748b" }}>
                          {beneficiary.contact_number || "—"}
                        </td>
                        <td style={{ padding: "16px 8px", verticalAlign: "middle" }}>
                          <span
                            style={{
                              color: statusMeta.color,
                              backgroundColor: statusMeta.bg,
                              fontWeight: "700",
                              fontSize: "11px",
                              padding: "4px 10px",
                              borderRadius: "6px",
                              textTransform: "uppercase",
                              display: "inline-block",
                              whiteSpace: "nowrap"
                            }}
                          >
                            {beneficiary.relief_status}
                          </span>
                        </td>
                        <td style={{ padding: "16px 8px", textAlign: "right", verticalAlign: "middle" }}>
                          <button
                            disabled={isClaimed}
                            onClick={() => claimRelief(beneficiary.id)}
                            style={{
                              padding: "8px 16px",
                              border: "none",
                              borderRadius: "6px",
                              cursor: isClaimed ? "not-allowed" : "pointer",
                              backgroundColor: isClaimed ? "#f1f5f9" : "#014421",
                              color: isClaimed ? "#94a3b8" : "#ffffff",
                              fontSize: "13px",
                              fontWeight: "600",
                              transition: "background-color 0.15s ease",
                            }}
                            onMouseEnter={(e) => {
                              if (!isClaimed) e.target.style.backgroundColor = "#02592c";
                            }}
                            onMouseLeave={(e) => {
                              if (!isClaimed) e.target.style.backgroundColor = "#014421";
                            }}
                          >
                            {isClaimed ? "Already Claimed" : "Verify Claim"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const tableHeaderStyle = {
  padding: "12px 8px",
  color: "#94a3b8",
  fontWeight: "700",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.5px"
};

export default BeneficiaryVerification;
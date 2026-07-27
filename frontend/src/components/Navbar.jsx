import { Link } from "react-router-dom";

function Navbar() {

  return (

    <div
      style={{

        backgroundColor:
          "#1e293b",

        padding:
          "15px 30px",

        color: "#fff",

        display: "flex",

        gap: "15px",

        alignItems:
          "center",

        flexWrap: "wrap",

        overflowX: "auto",

        whiteSpace: "nowrap",

        boxShadow:
          "0 2px 5px rgba(0,0,0,0.2)"

      }}
    >

      {/* DASHBOARD */}
      <Link
        to="/admin"
        style={navStyle}
      >
        Dashboard
      </Link>

      {/* INCIDENT MANAGEMENT */}
      <Link
        to="/incident-management"
        style={navStyle}
      >
        Incident Management
      </Link>

      {/* EVACUATION CENTERS */}
      <Link
        to="/admin-evacuation-centers"
        style={navStyle}
      >
        Evacuation Centers
      </Link>

      {/* ALERT BROADCASTING */}
      <Link
        to="/alert-broadcasting"
        style={navStyle}
      >
        Alert Broadcasting
      </Link>

      {/* RELIEF OPERATIONS */}
      <Link
        to="/relief-operations"
        style={navStyle}
      >
        Relief Operations
      </Link>

      {/* BENEFICIARY VERIFICATION */}
      <Link
        to="/beneficiary-verification"
        style={navStyle}
      >
        Beneficiary Verification
      </Link>

      {/* REPORTS & SECURITY */}
      <Link
        to="/reports-security"
        style={navStyle}
      >
        Reports & Security
      </Link>

      {/* AUDIT LOGS */}
      <Link
        to="/audit-logs"
        style={navStyle}
      >
        Audit Logs
      </Link>

      {/* ACCOUNT SETTINGS */}
      <Link
        to="/account-settings"
        style={navStyle}
      >
        Account Settings
      </Link>

      <Link
  to="/admin-relief-requests"
  style={navStyle}
>
  Relief Approvals
</Link>

<Link
  to="/admin-supply-inventory"
  style={navStyle}
>
  Supply Inventory
</Link>

    </div>

  );

}

// =====================================
// NAV STYLE
// =====================================

const navStyle = {

  color: "#ffffff",

  textDecoration:
    "none",

  fontWeight:
    "bold",

  fontSize:
    "15px",

  padding:
    "10px 14px",

  borderRadius:
    "8px",

  transition:
    "0.3s",

  background:
    "rgba(255,255,255,0.05)",

  flexShrink: 0

};

export default Navbar;
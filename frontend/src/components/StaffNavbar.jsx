import React from "react";
import { Link, useLocation } from "react-router-dom";

const StaffNavbar = () => {

  const location = useLocation();

  const navStyle = (path) => ({
    color:
      location.pathname === path
        ? "#38bdf8"
        : "white",

    textDecoration: "none",

    padding: "10px 14px",

    borderRadius: "8px",

    transition: "0.3s",

    fontWeight: "500",

    fontSize: "14px",

    background:
      location.pathname === path
        ? "rgba(255,255,255,0.1)"
        : "transparent",

    whiteSpace: "nowrap"
  });

  return (

    <div
      style={{
        background: "#1e293b",

        padding: "15px 20px",

        display: "flex",

        flexWrap: "wrap",

        gap: "10px",

        alignItems: "center",

        justifyContent: "flex-start"
      }}
    >

      {/* DASHBOARD */}
      <Link
        to="/staff"
        style={navStyle("/staff")}
      >
        Dashboard
      </Link>

     <Link
  to="/incident-reports"
  style={navStyle("/incident-reports")}
>
  Incident Reports
</Link>

      {/* EVACUATION */}
      <Link
        to="/evacuation-centers"
        style={navStyle("/evacuation-centers")}
      >
        Evacuation
      </Link>

      {/* RELIEF */}
      <Link
        to="/relief-requests"
        style={navStyle("/relief-requests")}
      >
        Relief
      </Link>

      {/* ANNOUNCEMENTS */}
      <Link
        to="/local-announcements"
        style={navStyle("/local-announcements")}
      >
        Announcements
      </Link>

      {/* HISTORY */}
      <Link
        to="/incident-history"
        style={navStyle("/incident-history")}
      >
        History
      </Link>

      {/* COMMUNITY NEEDS */}
      <Link
        to="/community-needs-assessment"
        style={navStyle("/community-needs-assessment")}
      >
        Needs
      </Link>

      {/* RESCUE */}
      <Link
        to="/rescue-response-coordination"
        style={navStyle("/rescue-response-coordination")}
      >
        Rescue
      </Link>

      {/* VOLUNTEERS */}
      <Link
        to="/volunteer-personnel-management"
        style={navStyle("/volunteer-personnel-management")}
      >
        Volunteers
      </Link>

      <Link
  to="/supply-inventory-monitoring"
  style={navStyle("/supply-inventory-monitoring")}
>
  Inventory
</Link>

<Link
  to="/evacuee-attendance-tracking"
  style={navStyle("/evacuee-attendance-tracking")}
>
  Evacuees
</Link>

      

    </div>

  );

};

export default StaffNavbar;
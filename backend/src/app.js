const express = require("express");
const cors = require("cors");

const authRoutes =
  require("./routes/authRoutes");

const staffIncidentRoutes =
  require("./routes/staffIncidents");

// NEW INCIDENT REPORT ROUTES
const incidentReportsRoutes =
  require("./routes/incidentReports");

const app = express();

app.use(cors());
app.use(express.json());


// =====================================
// ROUTES
// =====================================

// AUTH ROUTES
app.use(
  "/api/auth",
  authRoutes
);

// STAFF INCIDENT ROUTES
app.use(
  "/api/staff/incidents",
  staffIncidentRoutes
);

// INCIDENT REPORT MANAGEMENT ROUTES
app.use(
  "/api/incident-reports",
  incidentReportsRoutes
);

module.exports = app;
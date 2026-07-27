const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const app = express();

const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

app.use(cors());
app.use(express.json());

const PORT =
  process.env.PORT || 5000;

// =====================================
// ARDUINO CONNECTION
// =====================================

const arduinoPort = new SerialPort({
  path: "COM4",
  baudRate: 9600,
});

const parser = arduinoPort.pipe(
  new ReadlineParser({
    delimiter: "\r\n",
  })
);

// Prevent duplicate HIGH alerts
let lastFloodAlert = 0;
const FLOOD_ALERT_COOLDOWN = 30000; // 30 seconds

parser.on("data", async (data) => {

  data = data.trim();

  console.log("Arduino:", data);

  // Ignore messages that are not alerts
  if (!data.startsWith("ALERT:")) {
    return;
  }

  // Expected format:
  // ALERT:HIGH:145

  const parts = data.split(":");

  if (parts.length !== 3) {
    return;
  }

  const level = parts[1];
  const sensorValue = parts[2];

  // Only save HIGH alerts
  if (level !== "HIGH") {
    return;
  }

  // Prevent duplicate inserts while water stays HIGH
  if (Date.now() - lastFloodAlert < FLOOD_ALERT_COOLDOWN) {
    console.log("Flood alert skipped (cooldown)");
    return;
  }

  lastFloodAlert = Date.now();

  try {

    // Save to alerts table
    const alertResult = await pool.query(
      `
      INSERT INTO alerts
      (
        title,
        message,
        alert_type,
        target_barangay
      )
      VALUES
      ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        "Flood Warning",
        `Water level reached ${sensorValue}. Immediate action is required.`,
        "Flood",
        "All Barangays"
      ]
    );

    // Save audit log
    await pool.query(
      `
      INSERT INTO audit_logs
      (
        action_type,
        description,
        performed_by
      )
      VALUES
      ($1,$2,$3)
      `,
      [
        "ARDUINO_FLOOD_ALERT",
        `Arduino detected HIGH water level (${sensorValue})`,
        "Arduino Sensor"
      ]
    );

    console.log("Flood alert saved.");
    console.log(alertResult.rows[0]);

  } catch (err) {

    console.error("Database Error:", err.message);

  }

});
// =====================================
// ROUTES
// =====================================

// ... your existing routes continue here

// =====================================
// ROUTES
// =====================================

const authRoutes =
  require("./routes/authRoutes");

const loginRoute =
  require("./routes/auth/login");

const adminRoute =
  require("./routes/admin");

const incidentRoutes =
  require("./routes/incidents");

const alertRoutes =
  require("./routes/alerts");

const reliefRoutes =
  require("./routes/reliefOperations");

const beneficiaryRoutes =
  require("./routes/beneficiaries");

const reportsRoutes =
  require("./routes/reports");

const auditLogsRoutes =
  require("./routes/auditLogs");

const accountSettingsRoutes =
  require("./routes/accountSettings");

const incidentReportsRoutes =
  require("./routes/incidentReports");

const evacuationCentersRoutes =
  require("./routes/evacuationCenters");

const reliefRequestsRoutes =
  require("./routes/reliefRequests");

const localAnnouncementsRoutes =
  require("./routes/localAnnouncements");

const incidentHistoryRoutes =
  require("./routes/incidentHistory");

const communityNeedsAssessmentRoutes =
  require("./routes/communityNeedsAssessment");

const rescueResponseCoordinationRoutes =
  require("./routes/rescueResponseCoordination");

const volunteerPersonnelManagementRoutes =
  require("./routes/volunteerPersonnelManagement");

const supplyInventoryMonitoringRoutes =
  require("./routes/supplyInventoryMonitoring");

const evacueeAttendanceTrackingRoutes =
  require("./routes/evacueeAttendanceTracking");

const adminEvacuationCentersRoutes =
  require("./routes/adminEvacuationCenters");

const adminReliefRequestsRoutes =
  require("./routes/adminReliefRequests");

const adminSupplyInventoryRoutes =
  require("./routes/adminSupplyInventory");

const adminMessagesRoutes =
  require("./routes/adminMessages");

// =====================================
// ROOT TEST ROUTE
// =====================================

app.get(
  "/",
  async (req, res) => {

    try {

      const result =
        await pool.query(
          "SELECT NOW()"
        );

      res.status(200).json({

        success: true,

        message:
          "Backend and PostgreSQL connected successfully",

        time:
          result.rows[0],

      });

    } catch (error) {

      console.error(
        "Database Query Error:",
        error.message
      );

      res.status(500).json({

        success: false,

        error:
          "Database connection failed",

        details:
          error.message,

      });

    }

  }
);

// =====================================
// AUTH ROUTES
// =====================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/auth/login",
  loginRoute
);

// =====================================
// ADMIN ROUTES
// =====================================

app.use(
  "/api/admin",
  adminRoute
);

// =====================================
// INCIDENT ROUTES
// =====================================

app.use(
  "/api/incidents",
  incidentRoutes
);

// =====================================
// INCIDENT REPORTS
// =====================================

app.use(
  "/api/incident-reports",
  incidentReportsRoutes
);

// =====================================
// ALERT ROUTES
// =====================================

app.use(
  "/api/alerts",
  alertRoutes
);

// =====================================
// RELIEF OPERATIONS
// =====================================

app.use(
  "/api/relief-operations",
  reliefRoutes
);

// =====================================
// BENEFICIARY ROUTES
// =====================================

app.use(
  "/api/beneficiaries",
  beneficiaryRoutes
);

// =====================================
// REPORT ROUTES
// =====================================

app.use(
  "/api/reports",
  reportsRoutes
);

// =====================================
// AUDIT LOGS
// =====================================

app.use(
  "/api/audit-logs",
  auditLogsRoutes
);

// =====================================
// ACCOUNT SETTINGS
// =====================================

app.use(
  "/api/account-settings",
  accountSettingsRoutes
);

// =====================================
// EVACUATION CENTERS
// =====================================

app.use(
  "/api/evacuation-centers",
  evacuationCentersRoutes
);

// =====================================
// RELIEF REQUESTS
// =====================================

app.use(
  "/api/relief-requests",
  reliefRequestsRoutes
);

// =====================================
// LOCAL ANNOUNCEMENTS
// =====================================

app.use(
  "/api/local-announcements",
  localAnnouncementsRoutes
);

// =====================================
// INCIDENT HISTORY
// =====================================

app.use(
  "/api/incident-history",
  incidentHistoryRoutes
);

// =====================================
// COMMUNITY NEEDS ASSESSMENT
// =====================================

app.use(
  "/api/community-needs-assessment",
  communityNeedsAssessmentRoutes
);

// =====================================
// RESCUE RESPONSE COORDINATION
// =====================================

app.use(
  "/api/rescue-response-coordination",
  rescueResponseCoordinationRoutes
);

// =====================================
// VOLUNTEER PERSONNEL MANAGEMENT
// =====================================

app.use(
  "/api/volunteer-personnel-management",
  volunteerPersonnelManagementRoutes
);

// =====================================
// SUPPLY INVENTORY MONITORING
// =====================================

app.use(
  "/api/supply-inventory-monitoring",
  supplyInventoryMonitoringRoutes
);

// =====================================
// EVACUEE ATTENDANCE TRACKING
// =====================================

app.use(
  "/api/evacuee-attendance-tracking",
  evacueeAttendanceTrackingRoutes
);

// =====================================
// ADMIN EVACUATION CENTERS
// =====================================

app.use(
  "/api/admin-evacuation-centers",
  adminEvacuationCentersRoutes
);

// =====================================
// ADMIN RELIEF REQUESTS
// =====================================

app.use(
  "/api/admin-relief-requests",
  adminReliefRequestsRoutes
);

// =====================================
// ADMIN SUPPLY INVENTORY
// =====================================

app.use(
  "/api/admin-supply-inventory",
  adminSupplyInventoryRoutes
);

app.use(
  "/api/admin-messages",
  adminMessagesRoutes
);

// =====================================
// USERS API
// =====================================

// GET ALL USERS
app.get(
  "/api/users",
  async (req, res) => {

    try {

      const result =
        await pool.query(`
          SELECT
            id,
            full_name,
            email,
            role,
            status,
            created_at
          FROM users
          ORDER BY id ASC
        `);

      res.json(
        result.rows
      );

    } catch (error) {

      console.error(
        "Fetch Users Error:",
        error.message
      );

      res.status(500).json({

        error:
          "Failed to fetch users"

      });

    }

  }
);

// UPDATE USER STATUS
app.put(
  "/api/users/:id",
  async (req, res) => {

    const { id } =
      req.params;

    const { status } =
      req.body;

    try {

      const result =
        await pool.query(
          `
          UPDATE users
          SET
            status = $1,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = $2
          RETURNING *
          `,
          [
            status,
            id
          ]
        );

      res.json(
        result.rows[0]
      );

    } catch (error) {

      console.error(
        "Update User Error:",
        error.message
      );

      res.status(500).json({

        error:
          "Failed to update user"

      });

    }

  }
);

// DELETE USER
app.delete(
  "/api/users/:id",
  async (req, res) => {

    const { id } =
      req.params;

    try {

      await pool.query(
        `
        DELETE FROM users
        WHERE id = $1
        `,
        [id]
      );

      res.json({

        success: true,

        message:
          "User deleted successfully"

      });

    } catch (error) {

      console.error(
        "Delete User Error:",
        error.message
      );

      res.status(500).json({

        error:
          "Failed to delete user"

      });

    }

  }
);

// =====================================
// ADMIN MESSAGES API
// =====================================

// CREATE TABLE QUERY:
//
// CREATE TABLE admin_messages (
//
//   message_id SERIAL PRIMARY KEY,
//
//   sender_id INT,
//   sender_name VARCHAR(100),
//
//   receiver_id INT,
//
//   message TEXT NOT NULL,
//
//   created_at TIMESTAMP
//   DEFAULT CURRENT_TIMESTAMP
//
// );

// GET MESSAGES
app.get(
  "/api/admin-messages",
  async (req, res) => {

    try {

      const result =
        await pool.query(`
          SELECT
            m.*,
            u.full_name AS receiver_name
          FROM admin_messages m
          LEFT JOIN users u
          ON m.receiver_id = u.id
          ORDER BY m.created_at DESC
        `);

      res.json(
        result.rows
      );

    } catch (error) {

      console.error(
        "Fetch Messages Error:",
        error.message
      );

      res.status(500).json({

        error:
          "Failed to fetch messages"

      });

    }

  }
);

// SEND MESSAGE
app.post(
  "/api/admin-messages",
  async (req, res) => {

    const {

      sender_id,
      sender_name,

      receiver_id,

      message

    } = req.body;

    try {

      const result =
        await pool.query(
          `
          INSERT INTO admin_messages (

            sender_id,
            sender_name,

            receiver_id,

            message

          )

          VALUES ($1, $2, $3, $4)

          RETURNING *
          `,
          [

            sender_id,
            sender_name,

            receiver_id,

            message

          ]
        );

      res.json(
        result.rows[0]
      );

    } catch (error) {

      console.error(
        "Send Message Error:",
        error.message
      );

      res.status(500).json({

        error:
          "Failed to send message"

      });

    }

  }
);

// =====================================
// TEST INCIDENT ROUTE
// =====================================

app.get(
  "/api/test-incidents",
  async (req, res) => {

    try {

      const result =
        await pool.query(`
          SELECT *
          FROM incidents
          ORDER BY created_at DESC
        `);

      res.status(200).json({

        success: true,

        total:
          result.rows.length,

        incidents:
          result.rows,

      });

    } catch (error) {

      console.error(
        "Incident Fetch Error:",
        error.message
      );

      res.status(500).json({

        success: false,

        error:
          "Failed to fetch incidents",

      });

    }

  }
);

// =====================================
// TEST INCIDENT REPORTS ROUTE
// =====================================

app.get(
  "/api/test-incident-reports",
  async (req, res) => {

    try {

      const result =
        await pool.query(`
          SELECT *
          FROM incident_reports
          ORDER BY reported_at DESC
        `);

      res.status(200).json({

        success: true,

        total:
          result.rows.length,

        incident_reports:
          result.rows,

      });

    } catch (error) {

      console.error(
        "Incident Reports Fetch Error:",
        error.message
      );

      res.status(500).json({

        success: false,

        error:
          "Failed to fetch incident reports",

      });

    }

  }
);

// =====================================
// TEST ALERT ROUTE
// =====================================

app.get(
  "/api/test-alerts",
  async (req, res) => {

    try {

      const result =
        await pool.query(`
          SELECT *
          FROM alerts
          ORDER BY created_at DESC
        `);

      res.status(200).json({

        success: true,

        total:
          result.rows.length,

        alerts:
          result.rows,

      });

    } catch (error) {

      console.error(
        "Alert Fetch Error:",
        error.message
      );

      res.status(500).json({

        success: false,

        error:
          "Failed to fetch alerts",

      });

    }

  }
);

// =====================================
// SERVER START
// =====================================

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});
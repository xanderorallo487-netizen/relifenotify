import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// PAGES
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";

import IncidentManagement from "./pages/IncidentManagement";
import AlertBroadcasting from "./pages/AlertBroadcasting";
import ReliefOperations from "./pages/ReliefOperations";
import BeneficiaryVerification from "./pages/BeneficiaryVerification";
import ReportsSecurity from "./pages/ReportsSecurity";
import AuditLogs from "./pages/AuditLogs";
import AccountSettings from "./pages/AccountSettings";
import AdminEvacuationCenters from "./pages/AdminEvacuationCenters";
import AdminReliefRequests from "./pages/AdminReliefRequests";
import AdminSupplyInventory from "./pages/AdminSupplyInventory";

// STAFF PAGES
import IncidentReports from "./pages/staff-pages/IncidentReports";
import EvacuationCenters from "./pages/staff-pages/EvacuationCenters";
import ReliefRequests from "./pages/staff-pages/ReliefRequests";
import LocalAnnouncements from "./pages/staff-pages/LocalAnnouncements";
import IncidentHistory from "./pages/staff-pages/IncidentHistory";
import CommunityNeedsAssessment from "./pages/staff-pages/CommunityNeedsAssessment";
import RescueResponseCoordination from "./pages/staff-pages/RescueResponseCoordination";
import VolunteerPersonnelManagement from "./pages/staff-pages/VolunteerPersonnelManagement";
import SupplyInventoryMonitoring from "./pages/staff-pages/SupplyInventoryMonitoring";
import EvacueeAttendanceTracking from "./pages/staff-pages/EvacueeAttendanceTracking";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        {/* STAFF DASHBOARD */}
        <Route
          path="/staff"
          element={<StaffDashboard />}
        />

        {/* INCIDENT MANAGEMENT */}
        <Route
          path="/incident-management"
          element={<IncidentManagement />}
        />

        {/* INCIDENT REPORTS */}
        <Route
          path="/incident-reports"
          element={<IncidentReports />}
        />

        {/* ALERT BROADCASTING */}
        <Route
          path="/alert-broadcasting"
          element={<AlertBroadcasting />}
        />

        {/* RELIEF OPERATIONS */}
        <Route
          path="/relief-operations"
          element={<ReliefOperations />}
        />

        {/* BENEFICIARY VERIFICATION */}
        <Route
          path="/beneficiary-verification"
          element={<BeneficiaryVerification />}
        />

        {/* REPORTS & SECURITY */}
        <Route
          path="/reports-security"
          element={<ReportsSecurity />}
        />

        {/* AUDIT LOGS */}
        <Route
          path="/audit-logs"
          element={<AuditLogs />}
        />

        {/* ACCOUNT SETTINGS */}
        <Route
          path="/account-settings"
          element={<AccountSettings />}
        />

        {/* EVACUATION CENTERS */}
        <Route
          path="/evacuation-centers"
          element={<EvacuationCenters />}
        />

        {/* RELIEF REQUESTS */}
        <Route
          path="/relief-requests"
          element={<ReliefRequests />}
        />

        {/* LOCAL ANNOUNCEMENTS */}
        <Route
          path="/local-announcements"
          element={<LocalAnnouncements />}
        />

        {/* INCIDENT HISTORY */}
        <Route
          path="/incident-history"
          element={<IncidentHistory />}
        />

        {/* COMMUNITY NEEDS ASSESSMENT */}
        <Route
          path="/community-needs-assessment"
          element={<CommunityNeedsAssessment />}
        />

        {/* RESCUE RESPONSE COORDINATION */}
        <Route
          path="/rescue-response-coordination"
          element={<RescueResponseCoordination />}
        />

        {/* VOLUNTEER PERSONNEL MANAGEMENT */}
        <Route
          path="/volunteer-personnel-management"
          element={<VolunteerPersonnelManagement />}
        />

        {/* SUPPLY INVENTORY MONITORING */}
        <Route
          path="/supply-inventory-monitoring"
          element={<SupplyInventoryMonitoring />}
        />

        {/* EVACUEE ATTENDANCE TRACKING */}
        <Route
          path="/evacuee-attendance-tracking"
          element={<EvacueeAttendanceTracking />}
        />

        <Route
  path="/admin-evacuation-centers"
  element={<AdminEvacuationCenters />}
/>

<Route
  path="/admin-relief-requests"
  element={<AdminReliefRequests />}
/>

<Route
  path="/admin-supply-inventory"
  element={<AdminSupplyInventory />}
/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;
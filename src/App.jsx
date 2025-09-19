import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import VerifyEmail from "./components/VerifyEmail";
import Settings from "./components/Settings";
import Uploader from "./components/Uploader";
import ProtectedRoute from "./components/ProtectedRoute";
import TermsAndConditions from "./components/TermsAndConditions";
import TermsPage from "./components/TermsPage";
import SupportPage from "./components/Support&Help";
import DashboardHome from "./components/DashboardHome";   // ✅ welcome + cards page
import DashboardLayout from "./components/DashboardLayout"; // ✅ sidebar wrapper
import Credits from "./components/Credits";
// import SeedCredits  from "./components/Services";
import SeedServices  from "./components/Services";

import "./index.css";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* Protected Dashboard Routes */}
      <Route path="/terms" element={<ProtectedRoute><TermsAndConditions /></ProtectedRoute>} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout /> {/* ✅ sidebar always visible */}
          </ProtectedRoute>
        }
        >
        {/* Nested inside Dashboard layout */}
        <Route index element={<DashboardHome />} /> {/* ✅ default dashboard page */}
        <Route path="converter" element={<Uploader />} />
        <Route path="settings" element={<Settings />} />
        <Route path="terms/view" element={<TermsPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="credits" element={<Credits />} />
      </Route>

      {/* <Route path="/seed-services" element={<SeedCredits  />} /> */}
      {/* <Route path="/seed-services" element={<SeedServices  />} /> */}
    </Routes>
  );
}

export default App;

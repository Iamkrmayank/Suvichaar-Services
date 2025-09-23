// import { Routes, Route } from "react-router-dom";
// import Home from "./components/User_Dashboard/Home";
// import Login from "./components/User_Dashboard/Login";
// import Signup from "./components/User_Dashboard/Signup";
// import VerifyEmail from "./components/User_Dashboard/VerifyEmail";
// import Settings from "./components/User_Dashboard/Settings";
// import ProtectedRoute from "./components/User_Dashboard/ProtectedRoute";
// import TermsAndConditions from "./components/User_Dashboard/TermsAndConditions";
// import TermsPage from "./components/User_Dashboard/TermsPage";
// import SupportPage from "./components/User_Dashboard/Support&Help";
// import DashboardHome from "./components/User_Dashboard/DashboardHome";   // ✅ welcome + cards page
// import DashboardLayout from "./components/User_Dashboard/DashboardLayout"; // ✅ sidebar wrapper
// import Credits from "./components/User_Dashboard/Credits";

// import AdminLogin from "./components/Admin_Dashboard/AdminLogin";
// import AdminDashboardLayout from "./components/Admin_Dashboard/AdminDashboardLayout";

// import AdminDashboardHome from "./components/Admin_Dashboard/AdminDashboardHome";
// import ManageUsers from "./components/Admin_Dashboard/ManageUsers";
// import UserCreditsPage from "./components/Admin_Dashboard/UserCreditsPage";


// // all Services 
// import OcrCore from "./components/User_Dashboard/Tools/OcrCore";
// import AdvanceOcr from "./components/User_Dashboard/Tools/AdvanceOcr";

// import "./index.css";

// function App() {
//   return (
//     <Routes>
//       {/* Public */}
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/verify-email" element={<VerifyEmail />} />

//       {/* Protected Dashboard Routes */}
//       <Route path="/terms" element={<ProtectedRoute><TermsAndConditions /></ProtectedRoute>} />
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout /> {/* ✅ sidebar always visible */}
//           </ProtectedRoute>
//         }
//       >
//         {/* Nested inside Dashboard layout */}
//         <Route index element={<DashboardHome />} /> {/* ✅ default dashboard page */}
//         <Route path="ocr-core" element={<OcrCore />} />
//         <Route path="advance-ocr" element={<AdvanceOcr />} />
//         <Route path="settings" element={<Settings />} />
//         <Route path="terms/view" element={<TermsPage />} />
//         <Route path="support" element={<SupportPage />} />
//         <Route path="credits" element={<Credits />} />
//       </Route>

//       <Route path="/admin-login" element={<AdminLogin />} />
//       <Route path="/admin" element={<AdminDashboardLayout />}>
//         <Route index element={<AdminDashboardHome />} />
//         <Route path="manage-users" element={<ManageUsers />} />
//         <Route path="user-credits/:userId" element={<UserCreditsPage />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;



import { Routes, Route } from "react-router-dom";
import Home from "./components/User_Dashboard/Home";
import Login from "./components/User_Dashboard/Login";
import Signup from "./components/User_Dashboard/Signup";
import VerifyEmail from "./components/User_Dashboard/VerifyEmail";
import Settings from "./components/User_Dashboard/Settings";
import ProtectedRoute from "./components/User_Dashboard/ProtectedRoute";
import TermsAndConditions from "./components/User_Dashboard/TermsAndConditions";
import TermsPage from "./components/User_Dashboard/TermsPage";
import SupportPage from "./components/User_Dashboard/Support&Help";
import DashboardHome from "./components/User_Dashboard/DashboardHome";
import DashboardLayout from "./components/User_Dashboard/DashboardLayout";
import Credits from "./components/User_Dashboard/Credits";

import AdminLogin from "./components/Admin_Dashboard/AdminLogin";
import AdminDashboardLayout from "./components/Admin_Dashboard/AdminDashboardLayout";
import AdminDashboardHome from "./components/Admin_Dashboard/AdminDashboardHome";
import ManageUsers from "./components/Admin_Dashboard/ManageUsers";
import UserCreditsPage from "./components/Admin_Dashboard/UserCreditsPage";
import AdminRoute from "./components/Admin_Dashboard/AdminRoute"; // ✅ added

// all Services
import OcrCore from "./components/User_Dashboard/Tools/OcrCore";
import AdvanceOcr from "./components/User_Dashboard/Tools/AdvanceOcr";

import "./index.css";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* User Dashboard Routes (Protected) */}
      <Route
        path="/terms"
        element={
          <ProtectedRoute>
            <TermsAndConditions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="ocr-core" element={<OcrCore />} />
        <Route path="ocr-advance" element={<AdvanceOcr />} />
        <Route path="settings" element={<Settings />} />
        <Route path="terms/view" element={<TermsPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="credits" element={<Credits />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboardLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboardHome />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="user-credits/:userId" element={<UserCreditsPage />} />
      </Route>
    </Routes>
  );
}

export default App;

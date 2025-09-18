// import { Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import VerifyEmail from "./components/VerifyEmail";
// import Settings from "./components/Settings";
// import Uploader from "./components/Uploader";
// import DashboardLayout from "./components/Dashboard";
// import PrivateRoute from "./components/PrivateRoute";
// import TermsAndConditions from "./components/TermsAndConditions";
// import './index.css';

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/verify-email" element={<VerifyEmail />} />
//       <Route path="/settings" element={<Settings />} />
//       <Route path="/converter" element={<PrivateRoute><Uploader /></PrivateRoute>} />
//       <Route
//         path="/dashboard"
//         element={
//           <PrivateRoute>
//             <DashboardLayout />
//           </PrivateRoute>
//         }
//       />
//       <Route path="/terms" element={<TermsAndConditions />} />
//     </Routes>
//   );
// }

// export default App;


// import { Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import VerifyEmail from "./components/VerifyEmail";
// import Settings from "./components/Settings";
// import Uploader from "./components/Uploader";
// import DashboardLayout from "./components/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";  // ✅ use this instead
// import TermsAndConditions from "./components/TermsAndConditions";
// import TermsPage from "./components/TermsPage";
// import './index.css';
// import SupportPage from "./components/Support&Help";

// function App() {
//   return (
//     <Routes>
//       {/* Public */}
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
//       <Route path="/signup" element={<ProtectedRoute><Signup /></ProtectedRoute>} />
//       <Route path="/verify-email" element={<VerifyEmail />} />

//       {/* Protected */}
//       <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
//       <Route path="/converter" element={<ProtectedRoute><Uploader /></ProtectedRoute>} />
//       <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
//       <Route path="/terms/view" element={<ProtectedRoute> <TermsPage /> </ProtectedRoute>} />
//       <Route path="/support" element={<ProtectedRoute> <SupportPage /> </ProtectedRoute>} />
//     </Routes>
//   );
// }

// export default App;

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
      </Route>
    </Routes>
  );
}

export default App;

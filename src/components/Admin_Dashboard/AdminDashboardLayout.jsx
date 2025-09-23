// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { LogOut, Users, Shield, FileText, Settings, ChevronLeft, ChevronRight } from "lucide-react";
// import logo from "/ContentLabs_2.png";
// import logoIcon from "/Contentlabs2.png";

// function AdminDashboardLayout() {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear session (later we’ll add admin auth)
//     navigate("/admin-login");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside
//         className={`${isCollapsed ? "w-20" : "w-64"} bg-white shadow-lg text-black flex flex-col transition-all duration-300`}
//       >
//         {/* Logo + Collapse */}
//         <div className="flex items-center justify-between h-20 px-4 border-gray-200">
//           {isCollapsed ? (
//             <img src={logoIcon} alt="Logo small" className="h-12 w-auto" />
//           ) : (
//             <div className="flex items-center justify-center h-16 px-8">
//               <img src={logo} alt="Logo" className="h-20 w-auto" />
//             </div>
//           )}
//           <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 rounded hover:bg-gray-100">
//             {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
//           </button>
//         </div>

//         {/* Menu */}
//         <nav className="flex-1 px-2 py-4 space-y-1">
//           <Link to="/admin-dashboard" className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100">
//             <FileText className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Overview</span>}
//           </Link>
//           <Link to="/admin-dashboard/users" className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100">
//             <Users className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Manage Users</span>}
//           </Link>
//           <Link to="/admin-dashboard/admins" className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100">
//             <Shield className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Manage Admins</span>}
//           </Link>
//           <Link to="/admin-dashboard/reports" className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100">
//             <FileText className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Reports</span>}
//           </Link>
//           <Link to="/admin-dashboard/settings" className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100">
//             <Settings className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Settings</span>}
//           </Link>
//         </nav>

//         {/* Logout */}
//         <button
//           onClick={() => setShowConfirm(true)}
//           className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 mb-4"
//         >
//           <LogOut className="w-5 h-5" />
//           {!isCollapsed && <span className="ml-3">Logout</span>}
//         </button>
//       </aside>

//       {/* Content */}
//       <main className="flex-1 overflow-y-auto">
//         <Outlet />
//       </main>

//       {/* Confirm Logout */}
//       {showConfirm && (
//         <div className="fixed inset-0 bg-gray-600/25 backdrop-blur-xs flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-2xl p-6 w-96 border-2 border-[#E6A24B]">
//             <h2 className="text-xl font-semibold text-[#E6A24B] mb-2">Confirm Logout</h2>
//             <p className="mb-6">Are you sure you want to logout?</p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={handleLogout}
//                 className="px-5 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] transition"
//               >
//                 Yes, Logout
//               </button>
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="px-5 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminDashboardLayout;


// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import {
//   Home as HomeIcon,
//   Users,
//   Shield,
//   FileBarChart,
//   Settings,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import logo from "/ContentLabs_2.png";
// import logoIcon from "/Contentlabs2.png"; // collapsed version

// function AdminDashboardLayout() {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // TODO: clear session properly (when real auth is ready)
//     navigate("/admin-login");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside
//         className={`${
//           isCollapsed ? "w-20" : "w-64"
//         } bg-white shadow-lg text-black flex flex-col transition-all duration-300`}
//       >
//         {/* Logo + Collapse */}
//         <div className="flex items-center justify-between h-20 px-4 border-gray-200">
//           {isCollapsed ? (
//             <img src={logoIcon} alt="Logo small" className="h-12 w-auto" />
//           ) : (
//             <div className="flex items-center justify-center h-16 px-8">
//               <img src={logo} alt="Logo" className="h-20 w-auto" />
//             </div>
//           )}
//           <button
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             className="p-1 rounded hover:bg-gray-100"
//           >
//             {isCollapsed ? (
//               <ChevronRight className="w-5 h-5" />
//             ) : (
//               <ChevronLeft className="w-5 h-5" />
//             )}
//           </button>
//         </div>

//         {/* Menu */}
//         <nav className="flex-1 px-2 py-4 space-y-1">
//           <Link
//             to="/admin-dashboard"
//             className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//               isCollapsed ? "justify-center" : "px-3"
//             }`}
//           >
//             <HomeIcon className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Dashboard</span>}
//           </Link>

//           <Link
//             to="/admin-dashboard/users"
//             className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//               isCollapsed ? "justify-center" : "px-3"
//             }`}
//           >
//             <Users className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Manage Users</span>}
//           </Link>

//           <Link
//             to="/admin-dashboard/admins"
//             className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//               isCollapsed ? "justify-center" : "px-3"
//             }`}
//           >
//             <Shield className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Manage Admins</span>}
//           </Link>

//           <Link
//             to="/admin-dashboard/reports"
//             className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//               isCollapsed ? "justify-center" : "px-3"
//             }`}
//           >
//             <FileBarChart className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Reports</span>}
//           </Link>

//           <Link
//             to="/admin-dashboard/settings"
//             className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//               isCollapsed ? "justify-center" : "px-3"
//             }`}
//           >
//             <Settings className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Settings</span>}
//           </Link>
//         </nav>

//         {/* Logout */}
//         <div className="flex flex-col p-2 border-t border-gray-200 gap-2">
//           <button
//             onClick={() => setShowConfirm(true)}
//             className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//               isCollapsed ? "justify-center" : "px-3"
//             }`}
//           >
//             <LogOut className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto">
//         <Outlet />
//       </main>

//       {/* Confirm Logout Modal */}
//       {showConfirm && (
//         <div className="fixed inset-0 bg-gray-600/25 backdrop-blur-xs flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-2xl p-6 w-96 border-2 border-[#E6A24B]">
//             <h2 className="text-xl font-semibold text-[#E6A24B] mb-2">
//               Confirm Logout
//             </h2>
//             <p className="mb-6">Are you sure you want to logout?</p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={handleLogout}
//                 className="px-5 py-2 bg-[#E6A24B] text-white rounded-lg shadow hover:bg-[#d68d32] transition"
//               >
//                 Yes, Logout
//               </button>
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="px-5 py-2 bg-gray-100 text-gray-800 rounded-lg shadow hover:bg-gray-200 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminDashboardLayout;


// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { auth, db } from "../../firebase_config/config";
// import { useEffect, useState } from "react";
// import { doc, onSnapshot } from "firebase/firestore";
// import { signOut } from "firebase/auth";
// import {
//   Home as HomeIcon,
//   Repeat,
//   LogOut,
//   Settings,
//   FileText,
//   HelpCircle,
//   ChevronLeft,
//   ChevronRight,
//   BookOpen,
//   FileCode,
//   Languages,
//   Sparkles,
//   ScanText,
//   CreditCard
// } from "lucide-react";
// import logo from "/ContentLabs_2.png";
// import logoIcon from "/Contentlabs2.png"; // small version for collapsed menu

// function AdminDashboardLayout() {
//   const [userDetails, setUserDetails] = useState(null);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false); // 👈 new state
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         const userRef = doc(db, "Users", user.uid);

//         const unsubSnap = onSnapshot(userRef, (snap) => {
//           if (snap.exists()) {
//             setUserDetails(snap.data());
//           } else {
//             setUserDetails({
//               email: user.email,
//               displayName: user.displayName || "",
//               photoURL: user.photoURL || "",
//             });
//           }
//         });

//         return () => unsubSnap();
//       } else {
//         setUserDetails(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await signOut(auth);
//     setUserDetails(null);
//     navigate("/");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50 ">
//       {/* Sidebar */}
//       <aside
//         className={`${isCollapsed ? "w-20" : "w-64"
//           } bg-white shadow-lg text-black flex flex-col transition-all duration-300`}
//       >
//         {/* Logo + Collapse Button */}
//         <div className="flex items-center justify-between h-20 px-4 border-gray-200">
//           {isCollapsed ? (
//             <img src={logoIcon} alt="Logo small" className="h-12 w-auto" />
//           ) : (
//             <div className="flex items-center justify-center h-16 px-8">
//               <img src={logo} alt="Logo" className="h-20 w-auto" />
//             </div>
//           )}
//           <button
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             className="p-1 rounded hover:bg-gray-100"
//           >
//             {isCollapsed ? (
//               <ChevronRight className="w-5 h-5" />
//             ) : (
//               <ChevronLeft className="w-5 h-5" />
//             )}
//           </button>
//         </div>

//         {/* Menu */}
//         <nav className="flex-1 px-2 py-4 space-y-1">
//           <Link
//             to="/dashboard"
//             className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${isCollapsed ? "justify-center" : "px-3"
//               }`}
//           >
//             <HomeIcon className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Dashboard</span>}
//           </Link>

//           {/* OCR Core */}
//           <Link
//             to="/dashboard/converter"
//             className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${isCollapsed ? "justify-center" : "px-3"
//               }`}
//           >
//             <ScanText className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">OCR Core</span>}
//           </Link>

//           {/* OCR Advanced */}
//           <Link
//             to="/dashboard/ocr-advanced"
//             className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${isCollapsed ? "justify-center" : "px-3"
//               }`}
//           >
//             <Repeat className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">OCR Advanced</span>}
//           </Link>
//         </nav>

//         {userDetails && (
//           <div className="flex flex-col p-2 border-t border-gray-200 gap-2">
//             <Link
//               to="/dashboard/terms/view"
//               className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${isCollapsed ? "justify-center" : "px-3"
//                 }`}
//             >
//               <FileText className="w-5 h-5" />
//               {!isCollapsed && <span className="ml-3">Terms & Conditions</span>}
//             </Link>
//             <Link
//               to="/dashboard/credits"
//               className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${isCollapsed ? "justify-center" : "px-3"
//                 }`}
//             >
//               <CreditCard className="w-5 h-5" />
//               {!isCollapsed && <span className="ml-3">Credits</span>}
//             </Link>
//             <Link
//               to="/dashboard/support"
//               className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${isCollapsed ? "justify-center" : "px-3"
//                 }`}
//             >
//               <HelpCircle className="w-5 h-5" />
//               {!isCollapsed && <span className="ml-3">Support</span>}
//             </Link>
//             <Link
//               to="/dashboard/settings"
//               className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${isCollapsed ? "justify-center" : "px-3"
//                 }`}
//             >
//               <Settings className="w-5 h-5" />
//               {!isCollapsed && <span className="ml-3">Settings</span>}
//             </Link>

//             <button
//               onClick={() => setShowConfirm(true)} // 👈 open confirm dialog
//               className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${isCollapsed ? "justify-center" : "px-3"
//                 }`}
//             >
//               <LogOut className="w-5 h-5" />
//               {!isCollapsed && <span className="ml-3">Logout</span>}
//             </button>
//           </div>
//         )}
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto">
//         {/* Top Right Profile */}
//         <div className="absolute top-5 right-5">
//           {userDetails ? (
//             <div className="w-12 h-12 rounded-full border border-[#E6A24B] overflow-hidden flex items-center justify-center bg-white">
//               {userDetails?.photoURL ? (
//                 <img
//                   src={userDetails.photoURL}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="w-full h-full flex items-center justify-center bg-[#E6A24B] text-xl font-bold text-white">
//                   {userDetails?.firstName?.charAt(0)?.toUpperCase() ||
//                     userDetails?.displayName?.charAt(0)?.toUpperCase() ||
//                     "U"}
//                 </span>
//               )}
//             </div>
//           ) : (
//             <div>
//               <Link to="/login">
//                 <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32]">
//                   Login
//                 </button>
//               </Link>
//               <Link to="/signup">
//                 <button className="ml-2 px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32]">
//                   Sign Up
//                 </button>
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Dynamic page content */}
//         <Outlet context={{ userDetails }} />
//       </main>


// {showConfirm && (
//   <div className="fixed inset-0 bg-gray-600/25 backdrop-blur-xs flex items-center justify-center z-50">
//     <div className="bg-white rounded-xl shadow-2xl p-6 w-96 border-2 border-[#E6A24B] drop-shadow-2xl">
//       <h2 className="text-xl font-semibold text-[#E6A24B] mb-2">
//         Confirm Logout
//       </h2>
//       <p className=" mb-6">
//         Are you sure you want to logout?
//       </p>
//       <div className="flex justify-center gap-4">
//         {/* Yes Button */}
//         <button
//           onClick={handleLogout}
//           className="px-5 py-2 bg-[#E6A24B] text-white rounded-lg shadow hover:bg-[#d68d32] transition"
//         >
//           Yes, Logout
//         </button>

//         {/* Cancel Button */}
//         <button
//           onClick={() => setShowConfirm(false)}
//           className="px-5 py-2 bg-gray-100 text-gray-800 rounded-lg shadow hover:bg-gray-200 transition"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   </div>
// )}


//     </div>
//   );
// }

// export default AdminDashboardLayout;


import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../firebase_config/config";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import {
  Home as HomeIcon,
  Users,
  Shield,
  FileBarChart,
  HelpCircle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Server,
  Activity,
} from "lucide-react";
import logo from "/ContentLabs_2.png";
import logoIcon from "/Contentlabs2.png"; // collapsed version

function AdminDashboardLayout() {
  const [adminDetails, setAdminDetails] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAdminDetails({
          email: user.email,
          displayName: user.displayName || "Admin",
          photoURL: user.photoURL || "",
        });
      } else {
        setAdminDetails(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setAdminDetails(null);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-white shadow-lg text-black flex flex-col transition-all duration-300`}
      >
        {/* Logo + Collapse */}
        <div className="flex items-center justify-between h-20 px-4 border-gray-200">
          {isCollapsed ? (
            <img src={logoIcon} alt="Logo small" className="h-12 w-auto" />
          ) : (
            <div className="flex items-center justify-center h-16 px-8">
              <img src={logo} alt="Logo" className="h-20 w-auto" />
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-gray-100"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          <Link
            to="/admin-dashboard"
            className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : "px-3"
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Dashboard</span>}
          </Link>

          <Link
            to="/admin/manage-users"
            className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : "px-3"
            }`}
          >
            <Users className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Manage Users</span>}
          </Link>

          <Link
            to="/admin-dashboard/admins"
            className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : "px-3"
            }`}
          >
            <Shield className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Manage Admins</span>}
          </Link>

          <Link
            to="/admin-dashboard/reports"
            className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : "px-3"
            }`}
          >
            <FileBarChart className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Reports</span>}
          </Link>

          <Link
            to="/admin-dashboard/system"
            className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : "px-3"
            }`}
          >
            <Server className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">System Health</span>}
          </Link>

          <Link
            to="/admin-dashboard/activity"
            className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : "px-3"
            }`}
          >
            <Activity className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Activity Logs</span>}
          </Link>
        </nav>

        {/* Bottom Menu */}
        <div className="flex flex-col p-2 border-t border-gray-200 gap-2">
          <Link
            to="/admin-dashboard/support"
            className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : "px-3"
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Support</span>}
          </Link>

          <Link
            to="/admin-dashboard/settings"
            className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : "px-3"
            }`}
          >
            <Settings className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Settings</span>}
          </Link>

          <button
            onClick={() => setShowConfirm(true)}
            className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : "px-3"
            }`}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Right Admin Profile */}
        <div className="absolute top-5 right-5">
          {adminDetails ? (
            <div className="w-12 h-12 rounded-full border border-[#E6A24B] overflow-hidden flex items-center justify-center bg-white">
              {adminDetails.photoURL ? (
                <img
                  src={adminDetails.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="w-full h-full flex items-center justify-center bg-[#E6A24B] text-xl font-bold text-white">
                  {adminDetails.displayName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          ) : null}
        </div>

        {/* Render Children */}
        <Outlet context={{ adminDetails }} />
      </main>

      {/* Confirm Logout Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-gray-600/25 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-96 border-2 border-[#E6A24B]">
            <h2 className="text-xl font-semibold text-[#E6A24B] mb-2">
              Confirm Logout
            </h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-[#E6A24B] text-white rounded-lg shadow hover:bg-[#d68d32] transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-5 py-2 bg-gray-100 text-gray-800 rounded-lg shadow hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboardLayout;

// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { auth, db } from "../firebase_config/config";
// import { useEffect, useState } from "react";
// import { getDoc, doc } from "firebase/firestore";
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
// } from "lucide-react";
// import logo from "/ContentLabs_2.png";
// import logoIcon from "/Contentlabs2.png"; // small version for collapsed menu

// function DashboardLayout() {
//   const [userDetails, setUserDetails] = useState(null);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         try {
//           const docRef = doc(db, "Users", user.uid);
//           const docSnap = await getDoc(docRef);

//           if (docSnap.exists()) {
//             setUserDetails(docSnap.data());
//           } else {
//             setUserDetails({
//               email: user.email,
//               displayName: user.displayName || "",
//               photoURL: user.photoURL || "",
//             });
//           }
//         } catch (err) {
//           console.error("Error fetching user profile:", err);
//         }
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
//     <div className="flex min-h-screen bg-gray-50 bg-gradient-to-br from-[#FDFBF7] to-[#F6F1EB]">
//       {/* Sidebar */}
//       <aside
//         className={`${
//           isCollapsed ? "w-20" : "w-64"
//         } bg-white shadow-lg text-black flex flex-col transition-all duration-300`}
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
//         <nav className="flex-1 px-2 py-4">
//           <Link
//             to="/dashboard"
//             className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//               isCollapsed ? "justify-center" : "px-3"
//             }`}
//           >
//             <HomeIcon className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Dashboard</span>}
//           </Link>
//           <Link
//             to="/dashboard/converter"
//             className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//               isCollapsed ? "justify-center" : "px-3"
//             }`}
//           >
//             <Repeat className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Advance OCR Tool</span>}
//           </Link>
//         </nav>

//         {userDetails && (
//           <div className="flex flex-col p-2 border-t border-gray-200 gap-2">
//             <Link
//               to="/dashboard/terms/view"
//               className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//                 isCollapsed ? "justify-center" : "px-3"
//               }`}
//             >
//               <FileText className="w-5 h-5" />
//               {!isCollapsed && <span className="ml-3">Terms & Conditions</span>}
//             </Link>
//             <Link
//               to="/dashboard/support"
//               className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//                 isCollapsed ? "justify-center" : "px-3"
//               }`}
//             >
//               <HelpCircle className="w-5 h-5" />
//               {!isCollapsed && <span className="ml-3">Support</span>}
//             </Link>
//             <Link
//               to="/dashboard/settings"
//               className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//                 isCollapsed ? "justify-center" : "px-3"
//               }`}
//             >
//               <Settings className="w-5 h-5" />
//               {!isCollapsed && <span className="ml-3">Settings</span>}
//             </Link>
//             <button
//               onClick={handleLogout}
//               className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//                 isCollapsed ? "justify-center" : "px-3"
//               }`}
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
//                   {userDetails?.firstName?.charAt(0)?.toUpperCase() || "U"}
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
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// export default DashboardLayout;


// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { auth, db } from "../firebase_config/config";
// import { useEffect, useState } from "react";
// import { getDoc, doc } from "firebase/firestore";
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
// } from "lucide-react";
// import logo from "/ContentLabs_2.png";
// import logoIcon from "/Contentlabs2.png"; // small version for collapsed menu

// function DashboardLayout() {
//   const [userDetails, setUserDetails] = useState(null);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const navigate = useNavigate();

//   // 🔹 Fetch user profile from Firestore
//   const fetchUserDetails = async (user) => {
//     try {
//       const docRef = doc(db, "Users", user.uid);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         setUserDetails(docSnap.data());
//       } else {
//         setUserDetails({
//           email: user.email,
//           displayName: user.displayName || "",
//           photoURL: user.photoURL || "",
//         });
//       }
//     } catch (err) {
//       console.error("Error fetching user profile:", err);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         await fetchUserDetails(user);
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
//     <div className="flex min-h-screen bg-gray-50 bg-gradient-to-br from-[#FDFBF7] to-[#F6F1EB]">
//       {/* Sidebar */}
//       <aside
//         className={`${
//           isCollapsed ? "w-20" : "w-64"
//         } bg-white shadow-lg text-black flex flex-col transition-all duration-300`}
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
//         <nav className="flex-1 px-2 py-4">
//           <Link
//             to="/dashboard"
//             className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//               isCollapsed ? "justify-center" : "px-3"
//             }`}
//           >
//             <HomeIcon className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Dashboard</span>}
//           </Link>
//           <Link
//             to="/dashboard/converter"
//             className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//               isCollapsed ? "justify-center" : "px-3"
//             }`}
//           >
//             <Repeat className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Advance OCR Tool</span>}
//           </Link>
//         </nav>

//         {userDetails && (
//           <div className="flex flex-col p-2 border-t border-gray-200 gap-2">
//             <Link
//               to="/dashboard/terms/view"
//               className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//                 isCollapsed ? "justify-center" : "px-3"
//               }`}
//             >
//               <FileText className="w-5 h-5" />
//               {!isCollapsed && <span className="ml-3">Terms & Conditions</span>}
//             </Link>
//             <Link
//               to="/dashboard/support"
//               className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//                 isCollapsed ? "justify-center" : "px-3"
//               }`}
//             >
//               <HelpCircle className="w-5 h-5" />
//               {!isCollapsed && <span className="ml-3">Support</span>}
//             </Link>
//             <Link
//               to="/dashboard/settings"
//               className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//                 isCollapsed ? "justify-center" : "px-3"
//               }`}
//             >
//               <Settings className="w-5 h-5" />
//               {!isCollapsed && <span className="ml-3">Settings</span>}
//             </Link>
//             <button
//               onClick={handleLogout}
//               className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//                 isCollapsed ? "justify-center" : "px-3"
//               }`}
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
//         <Outlet context={{ userDetails, refreshUser: fetchUserDetails }} />
//       </main>
//     </div>
//   );
// }

// export default DashboardLayout;


import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase_config/config";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import {
  Home as HomeIcon,
  Repeat,
  LogOut,
  Settings,
  FileText,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import logo from "/ContentLabs_2.png";
import logoIcon from "/Contentlabs2.png"; // small version for collapsed menu

function DashboardLayout() {
  const [userDetails, setUserDetails] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userRef = doc(db, "Users", user.uid);

        // ✅ subscribe to live changes instead of one-time getDoc
        const unsubSnap = onSnapshot(userRef, (snap) => {
          if (snap.exists()) {
            setUserDetails(snap.data());
          } else {
            setUserDetails({
              email: user.email,
              displayName: user.displayName || "",
              photoURL: user.photoURL || "",
            });
          }
        });

        return () => unsubSnap(); // clean up snapshot listener
      } else {
        setUserDetails(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUserDetails(null);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 bg-gradient-to-br from-[#FDFBF7] to-[#F6F1EB]">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-white shadow-lg text-black flex flex-col transition-all duration-300`}
      >
        {/* Logo + Collapse Button */}
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
        <nav className="flex-1 px-2 py-4">
          <Link
            to="/dashboard"
            className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : "px-3"
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Dashboard</span>}
          </Link>
          <Link
            to="/dashboard/converter"
            className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : "px-3"
            }`}
          >
            <Repeat className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Advance OCR Tool</span>}
          </Link>
        </nav>

        {userDetails && (
          <div className="flex flex-col p-2 border-t border-gray-200 gap-2">
            <Link
              to="/dashboard/terms/view"
              className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
                isCollapsed ? "justify-center" : "px-3"
              }`}
            >
              <FileText className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Terms & Conditions</span>}
            </Link>
            <Link
              to="/dashboard/support"
              className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
                isCollapsed ? "justify-center" : "px-3"
              }`}
            >
              <HelpCircle className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Support</span>}
            </Link>
            <Link
              to="/dashboard/settings"
              className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
                isCollapsed ? "justify-center" : "px-3"
              }`}
            >
              <Settings className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Settings</span>}
            </Link>
            <button
              onClick={handleLogout}
              className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
                isCollapsed ? "justify-center" : "px-3"
              }`}
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Logout</span>}
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Right Profile */}
        <div className="absolute top-5 right-5">
          {userDetails ? (
            <div className="w-12 h-12 rounded-full border border-[#E6A24B] overflow-hidden flex items-center justify-center bg-white">
              {userDetails?.photoURL ? (
                <img
                  src={userDetails.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="w-full h-full flex items-center justify-center bg-[#E6A24B] text-xl font-bold text-white">
                  {userDetails?.firstName?.charAt(0)?.toUpperCase() ||
                    userDetails?.displayName?.charAt(0)?.toUpperCase() ||
                    "U"}
                </span>
              )}
            </div>
          ) : (
            <div>
              <Link to="/login">
                <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32]">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="ml-2 px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32]">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Dynamic page content */}
        <Outlet context={{ userDetails }} />
      </main>
    </div>
  );
}

export default DashboardLayout;

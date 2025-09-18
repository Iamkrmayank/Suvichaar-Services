// import { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Home,
//   FileText,
//   Upload,
//   Repeat,
//   LogOut,
// } from "lucide-react"; // you can install lucide-react for icons

// function DashboardLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside
//         className={`${
//           sidebarOpen ? "w-64" : "w-20"
//         } bg-[#E6A24B] text-black flex flex-col transition-all duration-300`}
//       >
//         {/* Logo */}
//         <div className="flex items-center justify-center h-16 border-b border-black/20">
//           <img
//             src="/logo.png" // replace with your logo path
//             alt="Logo"
//             className="h-10"
//           />
//         </div>

//         {/* Menu Items */}
//         <nav className="flex-1 px-2 py-4">
//           <Link
//             to="/"
//             className="flex items-center px-3 py-2 rounded-lg hover:bg-black/10"
//           >
//             <Home className="mr-3 w-5 h-5" />
//             {sidebarOpen && "Dashboard"}
//           </Link>
//           <Link
//             to="/files"
//             className="flex items-center px-3 py-2 rounded-lg hover:bg-black/10"
//           >
//             <FileText className="mr-3 w-5 h-5" />
//             {sidebarOpen && "File Manager"}
//           </Link>
//           <Link
//             to="/upload"
//             className="flex items-center px-3 py-2 rounded-lg hover:bg-black/10"
//           >
//             <Upload className="mr-3 w-5 h-5" />
//             {sidebarOpen && "Upload File"}
//           </Link>
//           <Link
//             to="/converter"
//             className="flex items-center px-3 py-2 rounded-lg hover:bg-black/10"
//           >
//             <Repeat className="mr-3 w-5 h-5" />
//             {sidebarOpen && "Converter Tool"}
//           </Link>
//         </nav>

//         {/* Bottom Logout */}
//         <div className="p-3 border-t border-black/20">
//           <button className="flex items-center px-3 py-2 w-full text-left rounded-lg hover:bg-black/10">
//             <LogOut className="mr-3 w-5 h-5" />
//             {sidebarOpen && "Logout"}
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto">
//         {children || <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>}
//       </main>
//     </div>
//   );
// }

// export default DashboardLayout;



// import { Link } from "react-router-dom";
// import { auth, db } from "../firebase_config/config";
// import { useEffect, useState } from "react";
// import { getDoc, doc } from "firebase/firestore";
// import { signOut } from "firebase/auth";
// import {
//   Home as HomeIcon,
//   FileText,
//   Upload,
//   Repeat,
//   LogOut,
//   Settings,
// } from "lucide-react";
// import logo from "/Contentlabs2.png";
// function DashboardLayout() {
//   const [userDetails, setUserDetails] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

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
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 text-black flex flex-col">
//         {/* Logo */}
//         {/* <div className="flex items-center justify-start h-16 border-b border-black/20">
//           <img
//             // src="/logo.png" // replace with your logo path
//             src={logo} // replace with your logo path
//             alt="Logo"
//             className="h-18"
//           />
//         </div> */}

//         <div className="flex items-center justify-start h-16 border-b border-r border-black/20 px-4">
//           <img
//             src={logo} // import your logo at the top: import logo from "../assets/logo.png"
//             alt="Logo"
//             className="h-12 w-auto"
//             style={{position:"absolute"}}
//           />
//           <span className="ml-8 text-xl font-bold text-black">
//             Content <span className="text-white  bg-[#E6A24B] rounded " >LABS</span>
//           </span>
//         </div>


//         {/* Menu */}
//         <nav className="flex-1 px-2 py-4 border-r  border-black/20">
//           <Link
//             to="/dashboard"
//             className="flex items-center px-3 py-2 rounded-lg hover:bg-black/10"
//           >
//             <HomeIcon className="mr-3 w-5 h-5" />
//             Dashboard
//           </Link>
//           <Link
//             to="/converter"
//             className="flex items-center px-3 py-2 rounded-lg hover:bg-black/10"
//           >
//             <Repeat className="mr-3 w-5 h-5" />
//            ORC Converter Tool
//           </Link>
//           <Link
//             to="/settings"
//             className="flex items-center px-3 py-2 rounded-lg hover:bg-black/10"
//           >
//             <Settings className="mr-3 w-5 h-5" />
//             Settings
//           </Link>
//         </nav>

//         {/* Bottom Logout */}
//         {userDetails && (
//           <div className="p-3 border-t border-black/20">
//             <button
//               onClick={handleLogout}
//               className="flex items-center px-3 py-2 w-full text-left rounded-lg hover:bg-black/10"
//             >
//               <LogOut className="mr-3 w-5 h-5" />
//               Logout
//             </button>
//           </div>
//         )}
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br ">
//         {/* Top Right Profile / Auth Buttons */}
//         <div className="absolute top-5 right-5">
//           {userDetails ? (
//             <div className="relative">
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="w-12 h-12 rounded-full border border-[#E6A24B] 
//                 hover:border-black focus:outline-none overflow-hidden flex items-center justify-center bg-white"
//               >
//                 {userDetails?.photoURL ? (
//                   <img
//                     src={userDetails.photoURL}
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span className="w-full h-full flex items-center justify-center 
//                     bg-[#E6A24B] text-xl font-bold text-white">
//                     {userDetails?.firstName?.charAt(0)?.toUpperCase() || "U"}
//                   </span>
//                 )}
//               </button>

//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white border border-[#B7D4E9] rounded-lg shadow-lg">
//                   <button
//                     onClick={handleLogout}
//                     className="w-full px-4 py-2 text-left text-black hover:bg-[#E6A24B]/20"
//                   >
//                     Logout
//                   </button>
//                   <Link
//                     to="/settings"
//                     className="block px-4 py-2 text-black hover:bg-[#E6A24B]/20"
//                   >
//                     Settings
//                   </Link>
//                 </div>
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

//         {/* Welcome Section */}
//         <h1 className="text-4xl font-bold mt-10">
//           Welcome{" "}
//           {userDetails
//             ? `${userDetails.firstName || ""} ${userDetails.lastName || ""}`
//             : "Guest"}
//         </h1>
//         <p className="text-gray-700 mt-2">This is the home page.</p>
//       </main>
//     </div>
//   );
// }

// export default DashboardLayout;


// import { Link } from "react-router-dom";
// import { auth, db } from "../firebase_config/config";
// import { useEffect, useState } from "react";
// import { getDoc, doc } from "firebase/firestore";
// import { signOut } from "firebase/auth";
// import {
//   Home as HomeIcon,
//   Repeat,
//   LogOut,
//   Settings,
// } from "lucide-react";
// import logo from "/Contentlabs2.png";

// function DashboardLayout() {
//   const [userDetails, setUserDetails] = useState(null);

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
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 text-black flex flex-col">
//         {/* Logo */}
//         <div className="flex items-center justify-start h-16 border-b border-r border-black/20 px-4">
//           <img
//             src={logo}
//             alt="Logo"
//             className="h-12 w-auto"
//             style={{ position: "absolute" }}
//           />
//           <span className="ml-8 text-xl font-bold text-black">
//             Content{" "}
//             <span className="text-white bg-[#E6A24B] rounded">LABS</span>
//           </span>
//         </div>

//         {/* Menu */}
//         <nav className="flex-1 px-2 py-4 border-r border-black/20">
//           <Link
//             to="/dashboard"
//             className="flex items-center px-3 py-2 rounded-lg hover:bg-black/10"
//           >
//             <HomeIcon className="mr-3 w-5 h-5" />
//             Dashboard
//           </Link>
//           <Link
//             to="/converter"
//             className="flex items-center px-3 py-2 rounded-lg hover:bg-black/10"
//           >
//             <Repeat className="mr-3 w-5 h-5" />
//             OCR Converter Tool
//           </Link>
//           <Link
//             to="/settings"
//             className="flex items-center px-3 py-2 rounded-lg hover:bg-black/10"
//           >
//             <Settings className="mr-3 w-5 h-5" />
//             Settings
//           </Link>
//         </nav>

//         {/* Bottom Logout */}
//         {userDetails && (
//           <div className="p-3 border-t border-r border-black/20">
//             <button
//               onClick={handleLogout}
//               className="flex items-center px-3 py-2 w-full text-left rounded-lg hover:bg-black/10"
//             >
//               <LogOut className="mr-3 w-5 h-5" />
//               Logout
//             </button>
//           </div>
//         )}
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br">
//         {/* Top Right Profile / Auth Buttons */}
//         <div className="absolute top-5 right-5">
//           {userDetails ? (
//             <div
//               className="w-12 h-12 rounded-full border border-[#E6A24B] 
//               overflow-hidden flex items-center justify-center bg-white"
//             >
//               {userDetails?.photoURL ? (
//                 <img
//                   src={userDetails.photoURL}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span
//                   className="w-full h-full flex items-center justify-center 
//                   bg-[#E6A24B] text-xl font-bold text-white"
//                 >
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

//         {/* Welcome Section */}
//         <h1 className="text-4xl font-bold mt-10">
//           Welcome{" "}
//           {userDetails
//             ? `${userDetails.firstName || ""} ${userDetails.lastName || ""}`
//             : "Guest"}
//         </h1>
//         <p className="text-gray-700 mt-2">This is the home page.</p>
//       </main>
//     </div>
//   );
// }

// export default DashboardLayout;


// import { Link } from "react-router-dom";
// import { auth, db } from "../firebase_config/config";
// import { useEffect, useState } from "react";
// import { getDoc, doc } from "firebase/firestore";
// import { signOut } from "firebase/auth";
// import {
//   Home as HomeIcon,
//   Repeat,
//   LogOut,
//   Settings,
//   BookOpen,
//   FileQuestion,
//   FileText,
//   HelpCircle,
// } from "lucide-react";
// import logo from "/ContentLabs_2.png";

// function DashboardLayout() {
//   const [userDetails, setUserDetails] = useState(null);

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
//     <div className="flex min-h-screen bg-gray-50 bg-gradient-to-br from-[#FDFBF7] to-[#F6F1EB] ">
//       {/* Sidebar */}
//       <aside className="w-64 text-black flex flex-col">
//         {/* Logo */}
//         <div className="flex items-center justify-center h-16 border-r border-black/20 px-8 pt-15 pb-8">
//           <img
//             src={logo}
//             alt="Logo"
//             className="h-20 w-auto"
//             // style={{ position: "absolute" }}
//           />
//           {/* <span className="ml-8 text-xl font-bold text-black">
//             Content{" "}
//             <span className="text-white bg-[#E6A24B] rounded">LABS</span>
//           </span> */}
//         </div>

//         {/* Menu */}
//         <nav className="flex-1 px-2 py-4 border-r border-black/20">
//           <Link
//             to="/dashboard"
//             className="flex items-center px-3 py-2 rounded-lg hover:bg-black/10"
//           >
//             <HomeIcon className="mr-3 w-5 h-5" />
//             Dashboard
//           </Link>
//           <Link
//             to="/converter"
//             className="flex items-center px-3 py-2 rounded-lg hover:bg-black/10"
//           >
//             <Repeat className="mr-3 w-5 h-5" />
//             Advance OCR Tool
//           </Link>

//         </nav>
//         {userDetails && (
//           <div className="flex flex-col p-3 border-t border-r border-black/20 gap-2">
//             {/* Settings Link */}


//             {/* Terms and Conditions */}
//             <Link
//               to="/terms/view"
//               className="flex items-center px-3 py-2 text-left rounded-lg hover:bg-black/10"
//             >
//               <FileText className="mr-3 w-5 h-5" />
//               Terms & Conditions
//             </Link>

//             {/* Support */}
//             <Link
//               to="/support"
//               className="flex items-center px-3 py-2 text-left rounded-lg hover:bg-black/10"
//             >
//               <HelpCircle className="mr-3 w-5 h-5" />
//               Support
//             </Link>
//             <Link
//               to="/settings"
//               className="flex items-center px-3 py-2 text-left rounded-lg hover:bg-black/10"
//             >
//               <Settings className="mr-3 w-5 h-5" />
//               Settings
//             </Link>

//             {/* Logout Button */}
//             <button
//               onClick={handleLogout}
//               className="flex items-center px-3 py-2 text-left rounded-lg hover:bg-black/10"
//             >
//               <LogOut className="mr-3 w-5 h-5" />
//               Logout
//             </button>
//           </div>
//         )}

//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br">
//         {/* Top Right Profile / Auth Buttons */}
//         <div className="absolute top-5 right-5">
//           {userDetails ? (
//             <div
//               className="w-12 h-12 rounded-full border border-[#E6A24B] 
//               overflow-hidden flex items-center justify-center bg-white"
//             >
//               {userDetails?.photoURL ? (
//                 <img
//                   src={userDetails.photoURL}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span
//                   className="w-full h-full flex items-center justify-center 
//                   bg-[#E6A24B] text-xl font-bold text-white"
//                 >
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

//         {/* Welcome Section */}
//         <h1 className="text-4xl font-bold mt-10">
//           Welcome{" "}
//           {userDetails
//             ? `${userDetails.firstName || ""} ${userDetails.lastName || ""}`
//             : "Guest"}
//         </h1>
//         <p className="text-gray-700 mt-2 mb-8">
//           Here are some tools you can start using today:
//         </p>

//         {/* Tools Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* OCR Converter Tool */}
//           <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//             <h2 className="text-lg font-semibold mb-2">Advance OCR Tool</h2>
//             <p className="text-gray-600 mb-4">
//               Extract text from images and documents instantly.
//             </p>
//             <Link to="/converter">
//               <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
//                 Open Tool
//               </button>
//             </Link>
//           </div>

//           {/* Education Story Generator */}
//           <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//             <h2 className="text-lg font-semibold mb-2">Education Story Generator</h2>
//             <p className="text-gray-600 mb-4">
//               Generate engaging educational stories from topics.
//             </p>
//             <Link to="/story-generator">
//               <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
//                 Open Tool
//               </button>
//             </Link>
//           </div>

//           {/* Quiz Generator */}
//           <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//             <h2 className="text-lg font-semibold mb-2">Quiz Generator</h2>
//             <p className="text-gray-600 mb-4">
//               Generate quizzes instantly from any content.
//             </p>
//             <Link to="/quiz-generator">
//               <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
//                 Open Tool
//               </button>
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default DashboardLayout;



// import { Link, useNavigate } from "react-router-dom";
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
// import logoIcon from "/Contentlabs2.png"; // <-- small version for collapsed menu

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
//         className={`${isCollapsed ? "w-20" : "w-64"
//           } bg-white shadow-lg text-black flex flex-col transition-all duration-300`}
//       >
//         {/* Logo + Collapse Button */}
//         {/* <div className="flex items-center justify-between h-20 px-4  border-gray-200">
//           {isCollapsed ? (
//             <img src={logoIcon} alt="Logo small" className="h-10 w-auto" />
//           ) : (
//             <div className="flex items-center justify-center h-16  border-black/20 px-8 pt-15 pb-8">
//           <img
//             src={logo}
//             alt="Logo"
//             className="h-20 w-auto"
//           />
//         </div>
//           )}
//           <button
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             className="p-1 rounded hover:bg-gray-100 ml-2"
//           >
//             {isCollapsed ? (
//               <ChevronRight className="w-5 h-5" />
//             ) : (
//               <ChevronLeft className="w-5 h-5" />
//             )}
//           </button>
//         </div> */}

//         {/* Logo + Collapse Button */}
//         <div className="flex items-center justify-between h-20 px-4  border-gray-200">
//           {isCollapsed ? (
//             <img src={logoIcon} alt="Logo small" className="h-12 w-auto transform scale-130" />
//           ) : (
//             // <div className="flex items-center justify-center h-full w-full">
//             //   <img
//             //     src={logo}
//             //     alt="Logo full"
//             //     className="h-16 w-auto"
//             //   />
//             // </div>
//             <div className="flex items-center justify-center h-16  border-black/20 px-8 pt-15 pb-8">
//               <img
//                 src={logo}
//                 alt="Logo"
//                 className="h-20 w-auto"
//               />
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
//         <nav className="flex-1 px-2 py-4 ">
//           <Link
//             to="/dashboard"
//             className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100"
//           >
//             <HomeIcon className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Dashboard</span>}
//           </Link>
//           <Link
//             to="/converter"
//             className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100"
//           >
//             <Repeat className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Advance OCR Tool</span>}
//           </Link>
//         </nav>

//         {userDetails && (
//           <div className="flex flex-col p-2 border-t border-gray-200 gap-2">
//             <Link
//               to="/terms/view"
//               className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100"
//             >
//               <FileText className="w-5 h-5" />
//               {!isCollapsed && <span className="ml-3">Terms & Conditions</span>}
//             </Link>
//             <Link
//               to="/support"
//               className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100"
//             >
//               <HelpCircle className="w-5 h-5" />
//               {!isCollapsed && <span className="ml-3">Support</span>}
//             </Link>
//             <Link
//               to="/settings"
//               className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100"
//             >
//               <Settings className="w-5 h-5" />
//               {!isCollapsed && <span className="ml-3">Settings</span>}
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100"
//             >
//               <LogOut className="w-5 h-5" />
//               {!isCollapsed && <span className="ml-3">Logout</span>}
//             </button>
//           </div>
//         )}
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto">
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

//         {/* Welcome Section */}
//         <h1 className="text-4xl font-bold mt-10">
//           Welcome{" "}
//           {userDetails
//             ? `${userDetails.firstName || ""} ${userDetails.lastName || ""}`
//             : "Guest"}
//         </h1>
//         <p className="text-gray-700 mt-2 mb-8">
//           Here are some tools you can start using today:
//         </p>

//         {/* Tools Section (cards restored) */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* OCR Converter Tool */}
//           <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//             <h2 className="text-lg font-semibold mb-2">Advance OCR Tool</h2>
//             <p className="text-gray-600 mb-4">
//               Extract text from images and documents instantly.
//             </p>
//             <Link to="/converter">
//               <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
//                 Open Tool
//               </button>
//             </Link>
//           </div>

//           {/* Education Story Generator */}
//           <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//             <h2 className="text-lg font-semibold mb-2">
//               Education Story Generator
//             </h2>
//             <p className="text-gray-600 mb-4">
//               Generate engaging educational stories from topics.
//             </p>
//             <Link to="/story-generator">
//               <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
//                 Open Tool
//               </button>
//             </Link>
//           </div>

//           {/* Quiz Generator */}
//           <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//             <h2 className="text-lg font-semibold mb-2">Quiz Generator</h2>
//             <p className="text-gray-600 mb-4">
//               Generate quizzes instantly from any content.
//             </p>
//             <Link to="/quiz-generator">
//               <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
//                 Open Tool
//               </button>
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default DashboardLayout;


// import { Link, useNavigate } from "react-router-dom";
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
// import logoIcon from "/Contentlabs2.png"; // <-- small version for collapsed menu

// function DashboardHome() {
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
//         <div className="flex items-center justify-between h-20 px-4 border-gray-200 " style={{padding:'2rem'}}>
//           {isCollapsed ? (
//             <img src={logoIcon} alt="Logo small" className="h-12 w-auto transform scale-140" />
//           ) : (
//             <div className="flex items-center justify-center h-16 border-black/20 px-8 pt-15 pb-8">
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
//             className={`flex items-center py-2 rounded-lg hover:bg-gray-100 transition-all ${
//               isCollapsed ? "justify-center" : "px-3"
//             }`}
//           >
//             <HomeIcon className="w-5 h-5" />
//             {!isCollapsed && <span className="ml-3">Dashboard</span>}
//           </Link>
//           <Link
//             to="/converter"
//             className={`flex items-center py-2 rounded-lg hover:bg-gray-100 transition-all ${
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
//               to="/terms/view"
//               className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//                 isCollapsed ? "justify-center" : "px-3"
//               }`}
//             >
//               <FileText className="w-5 h-5" />
//               {!isCollapsed && <span className="ml-3">Terms & Conditions</span>}
//             </Link>
//             <Link
//               to="/support"
//               className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
//                 isCollapsed ? "justify-center" : "px-3"
//               }`}
//             >
//               <HelpCircle className="w-5 h-5" />
//               {!isCollapsed && <span className="ml-3">Support</span>}
//             </Link>
//             <Link
//               to="/settings"
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
//       <main className="flex-1 p-6 overflow-y-auto">
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

//         {/* Welcome Section */}
//         <h1 className="text-4xl font-bold mt-10">
//           Welcome{" "}
//           {userDetails
//             ? `${userDetails.firstName || ""} ${userDetails.lastName || ""}`
//             : "Guest"}
//         </h1>
//         <p className="text-gray-700 mt-2 mb-8">
//           Here are some tools you can start using today:
//         </p>

//         {/* Tools Section (cards restored) */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* OCR Converter Tool */}
//           <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//             <h2 className="text-lg font-semibold mb-2">Advance OCR Tool</h2>
//             <p className="text-gray-600 mb-4">
//               Extract text from images and documents instantly.
//             </p>
//             <Link to="/converter">
//               <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
//                 Open Tool
//               </button>
//             </Link>
//           </div>

//           {/* Education Story Generator */}
//           <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//             <h2 className="text-lg font-semibold mb-2">
//               Education Story Generator
//             </h2>
//             <p className="text-gray-600 mb-4">
//               Generate engaging educational stories from topics.
//             </p>
//             <Link to="/story-generator">
//               <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
//                 Open Tool
//               </button>
//             </Link>
//           </div>

//           {/* Quiz Generator */}
//           <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//             <h2 className="text-lg font-semibold mb-2">Quiz Generator</h2>
//             <p className="text-gray-600 mb-4">
//               Generate quizzes instantly from any content.
//             </p>
//             <Link to="/quiz-generator">
//               <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
//                 Open Tool
//               </button>
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default DashboardHome;


// import { Link } from "react-router-dom";

// function DashboardHome({ userDetails }) {
//   return (
//     <div className="p-6">
//       {/* Welcome Section */}
//       <h1 className="text-4xl font-bold mt-10">
//         Welcome{" "}
//         {userDetails
//           ? `${userDetails.firstName || ""} ${userDetails.lastName || ""}`
//           : "Guest"}
//       </h1>
//       <p className="text-gray-700 mt-2 mb-8">
//         Here are some tools you can start using today:
//       </p>

//       {/* Tools Section (cards) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* OCR Converter Tool */}
//         <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//           <h2 className="text-lg font-semibold mb-2">Advance OCR Tool</h2>
//           <p className="text-gray-600 mb-4">
//             Extract text from images and documents instantly.
//           </p>
//           <Link to="/dashboard/converter">
//             <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
//               Open Tool
//             </button>
//           </Link>
//         </div>

//         {/* Education Story Generator */}
//         <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//           <h2 className="text-lg font-semibold mb-2">
//             Education Story Generator
//           </h2>
//           <p className="text-gray-600 mb-4">
//             Generate engaging educational stories from topics.
//           </p>
//           <Link to="/dashboard/story-generator">
//             <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
//               Open Tool
//             </button>
//           </Link>
//         </div>

//         {/* Quiz Generator */}
//         <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//           <h2 className="text-lg font-semibold mb-2">Quiz Generator</h2>
//           <p className="text-gray-600 mb-4">
//             Generate quizzes instantly from any content.
//           </p>
//           <Link to="/dashboard/quiz-generator">
//             <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
//               Open Tool
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardHome;


// import { Link, useOutletContext } from "react-router-dom";

// function DashboardHome() {
//   // Get userDetails from parent (DashboardLayout)
//   const { userDetails } = useOutletContext();

//   return (
//     <div className="p-6">
//       {/* Welcome Section */}
//       <h1 className="text-4xl font-bold mt-10">
//         Welcome{" "}
//         {userDetails
//           ? `${userDetails.firstName || ""} ${userDetails.lastName || ""}`
//           : "Guest"}
//       </h1>
//       <p className="text-gray-700 mt-2 mb-8">
//         Here are some tools you can start using today:
//       </p>

//       {/* Tools Section (cards) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* OCR Converter Tool */}
//         <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//           <h2 className="text-lg font-semibold mb-2">Advance OCR Tool</h2>
//           <p className="text-gray-600 mb-4">
//             Extract text from images and documents instantly.
//           </p>
//           <Link to="/dashboard/converter">
//             <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
//               Open Tool
//             </button>
//           </Link>
//         </div>

//         {/* Education Story Generator */}
//         <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//           <h2 className="text-lg font-semibold mb-2">
//             Education Story Generator
//           </h2>
//           <p className="text-gray-600 mb-4">
//             Generate engaging educational stories from topics.
//           </p>
//           <Link to="/dashboard/story-generator">
//             <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
//               Open Tool
//             </button>
//           </Link>
//         </div>

//         {/* Quiz Generator */}
//         <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//           <h2 className="text-lg font-semibold mb-2">Quiz Generator</h2>
//           <p className="text-gray-600 mb-4">
//             Generate quizzes instantly from any content.
//           </p>
//           <Link to="/dashboard/quiz-generator">
//             <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
//               Open Tool
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardHome;


import { Link, useOutletContext } from "react-router-dom";

function DashboardHome() {
  // Get userDetails from parent (DashboardLayout)
  const { userDetails } = useOutletContext();

  // Utility function to decide which name to show
  const getUserName = () => {
    if (!userDetails) return "Guest";

    if (userDetails.firstName || userDetails.lastName) {
      return `${userDetails.firstName || ""} ${userDetails.lastName || ""}`.trim();
    }

    if (userDetails.displayName) {
      return userDetails.displayName;
    }

    return "Guest";
  };

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <h1 className="text-4xl font-bold mt-10">Welcome {getUserName()}</h1>
      <p className="text-gray-700 mt-2 mb-8">
        Here are some tools you can start using today:
      </p>

      {/* Tools Section (cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* OCR Converter Tool */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">Advance OCR Tool</h2>
          <p className="text-gray-600 mb-4">
            Extract text from images and documents instantly.
          </p>
          <Link to="/dashboard/converter">
            <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
              Open Tool
            </button>
          </Link>
        </div>

        {/* Education Story Generator */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">
            Education Story Generator
          </h2>
          <p className="text-gray-600 mb-4">
            Generate engaging educational stories from topics.
          </p>
          <Link to="/dashboard/story-generator">
            <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
              Open Tool
            </button>
          </Link>
        </div>

        {/* Quiz Generator */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">Quiz Generator</h2>
          <p className="text-gray-600 mb-4">
            Generate quizzes instantly from any content.
          </p>
          <Link to="/dashboard/quiz-generator">
            <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
              Open Tool
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;

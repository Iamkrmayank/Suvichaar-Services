// import { Link } from "react-router-dom";
// import { auth, db } from "../firebase_config/config";
// import { useEffect, useState } from "react";
// import { getDoc, doc } from "firebase/firestore";
// import { signOut } from "firebase/auth";

// function Home() {
//   const [userDetails, setUserDetails] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         try {
//           const docRef = doc(db, "Users", user.uid);
//           const docSnap = await getDoc(docRef);

//           // If Firestore document exists, use it
//           if (docSnap.exists()) {
//             setUserDetails(docSnap.data());
//             console.log("✅ Loaded User Data from Firestore:", docSnap.data());
//           } else {
//             // Fallback: construct minimal user info
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
//     console.log("User photoURL:", userDetails?.photoURL);

//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await signOut(auth);
//     setUserDetails(null);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900 text-white">
//       <div className="absolute top-5 right-5">
//         {userDetails ? (
//           <div className="relative">
//             {/* Profile Button */}
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="w-12 h-12 rounded-full border border-gray-600 hover:border-cyan-400 focus:outline-none overflow-hidden flex items-center justify-center"
//             >
//               {userDetails?.photoURL ? (
//                 <img
//                   src={userDetails.photoURL}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                   // className="w-12 h-12 rounded-full border ..."

//                 />
//               ) : (
//                 <span className="w-full h-full flex items-center justify-center bg-gray-700 text-xl font-bold text-white">
//                   {userDetails?.firstName?.charAt(0)?.toUpperCase() || "U"}
//                 </span>
//               )}
//             </button>

//             {/* Dropdown Menu */}
//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
//                 <button
//                   onClick={handleLogout}
//                   className="w-full px-4 py-2 text-left text-gray-200 hover:bg-gray-700"
//                 >
//                   Logout
//                 </button>
//                 <Link
//                   to="/settings"
//                   className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
//                 >
//                   Settings
//                 </Link>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div>
//             <Link to="/login">
//               <button className="px-4 py-2 bg-cyan-500 rounded-lg hover:bg-cyan-600">
//                 Login
//               </button>
//             </Link>
//             <Link to="/signup">
//               <button className="ml-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">
//                 Sign Up
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>

//       <h1 className="text-3xl font-bold">
//         Welcome{" "}
//         {userDetails
//           ? `${userDetails.firstName || ""} ${userDetails.lastName || ""}`
//           : "Guest"}
//       </h1>
//       <p className="text-gray-300">This is the home page.</p>
//     </div>
//   );
// }

// export default Home;


// -----------------------------------------------Working------------------------


// import { Link } from "react-router-dom";
// import { auth, db } from "../firebase_config/config";
// import { useEffect, useState } from "react";
// import { getDoc, doc } from "firebase/firestore";
// import { signOut } from "firebase/auth";

// function Home() {
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
//     <div className="min-h-screen flex flex-col items-center justify-center 
//       bg-gradient-to-br from-[#B7D4E9] via-white to-[#E6A24B] text-black">

//       {/* Top Right Profile / Auth Buttons */}
//       <div className="absolute top-5 right-5">
//         {userDetails ? (
//           <div className="relative">
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="w-12 h-12 rounded-full border border-[#E6A24B] 
//               hover:border-black focus:outline-none overflow-hidden flex items-center justify-center bg-white"
//             >
//               {userDetails?.photoURL ? (
//                 <img
//                   src={userDetails.photoURL}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="w-full h-full flex items-center justify-center 
//                   bg-[#E6A24B] text-xl font-bold text-white">
//                   {userDetails?.firstName?.charAt(0)?.toUpperCase() || "U"}
//                 </span>
//               )}
//             </button>

//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white border border-[#B7D4E9] rounded-lg shadow-lg">
//                 <button
//                   onClick={handleLogout}
//                   className="w-full px-4 py-2 text-left text-black hover:bg-[#E6A24B]/20"
//                 >
//                   Logout
//                 </button>
//                 <Link
//                   to="/settings"
//                   className="block px-4 py-2 text-black hover:bg-[#E6A24B]/20"
//                 >
//                   Settings
//                 </Link>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div>
//             <Link to="/login">
//               <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32]">
//                 Login
//               </button>
//             </Link>
//             <Link to="/signup">
//               <button className="ml-2 px-4 py-2 bg-[#B7D4E9] text-black rounded-lg hover:bg-[#9cc4e3]">
//                 Sign Up
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* Welcome Section */}
//       <h1 className="text-4xl font-bold mt-10">
//         Welcome{" "}
//         {userDetails
//           ? `${userDetails.firstName || ""} ${userDetails.lastName || ""}`
//           : "Guest"}
//       </h1>
//       <p className="text-gray-700 mt-2">This is the home page.</p>
//     </div>
//   );
// }

// export default Home;


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
// import logo from "../../public/Contentlabs2.png";
// function Home() {
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
//             to="/"
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

// export default Home;


// // src/pages/Home.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "/Contentlabs2.png";

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FDFBF7] to-[#F6F1EB] px-6">
//       {/* Logo + Brand */}
//       <div className="flex items-center justify-center mb-6">
//         <img src={logo} alt="Logo" className="h-12 w-auto -mr-4" />
//         <span className="text-3xl font-bold text-black">
//           Content{" "}
//           <span className="text-white bg-[#E6A24B] rounded px-2">LABS</span>
//         </span>
//       </div>

//       {/* Intro Text */}
//       <h1 className="text-2xl font-semibold text-gray-800 mb-3">
//         Welcome to Content LABS 🚀
//       </h1>
//       <p className="text-gray-600 text-center max-w-md mb-8">
//         To access your dashboard, please sign up or log in using your account.
//         Once you’re signed in, you’ll be redirected to your personalized
//         dashboard where you can start working with Content LABS.
//       </p>

//       {/* Get Started Button */}
//       <button
//         onClick={() => navigate("/signup")}
//         className="bg-[#E6A24B] hover:bg-[#d68d32] text-white text-lg font-medium py-3 px-8 rounded-lg shadow-md transition-all duration-300"
//       >
//         Get Started
//       </button>
//     </div>
//   );
// };

// export default Home;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../firebase_config/config"; // 👈 import your firebase auth
// import logo from "../../public/ContentLabs_2.png";

// const Home = () => {
//   const navigate = useNavigate();

//   const handleGetStarted = () => {
//     if (auth.currentUser) {
//       // ✅ user already logged in → go to dashboard
//       navigate("/dashboard");
//     } else {
//       // ❌ not logged in → go to signup
//       navigate("/signup");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FDFBF7] to-[#F6F1EB] px-6">
//       {/* Logo + Brand */}
//       {/* <div className="flex items-center justify-center mb-6"> */}
//         {/* <img src={logo} alt="Logo" className="h-12 w-auto -mr-4" /> */}
//         {/* <span className="text-3xl font-bold text-black">
//           Content{" "}
//           <span className="text-white bg-[#E6A24B] rounded px-2">LABS</span>
//         </span> */}
//       {/* </div> */}
//       <div className="flex items-center justify-center border-black/20 px-8 mb-4">
//                 <img
//                   src={logo}
//                   alt="Logo"
//                   className="h-30 w-auto"
//                   // style={{ position: "absolute" }}
//                 />
//                 {/* <span className="ml-8 text-xl font-bold text-black">
//                   Content{" "}
//                   <span className="text-white bg-[#E6A24B] rounded">LABS</span>
//                 </span> */}
//               </div>

//       {/* Intro Text */}
//       <h1 className="text-2xl font-semibold text-gray-800 mb-3">
//         Welcome to Content LABS 🚀
//       </h1>
//       <p className="text-gray-600 text-center max-w-md mb-8">
//         To access your dashboard, please sign up or log in using your account.
//         Once you’re signed in, you’ll be redirected to your personalized
//         dashboard where you can start working with Content LABS.
//       </p>

//       {/* Get Started Button */}
//       <button
//         onClick={handleGetStarted}
//         className="bg-[#E6A24B] hover:bg-[#d68d32] text-white text-lg font-medium py-3 px-8 rounded-lg shadow-md transition-all duration-300"
//       >
//         Get Started
//       </button>
//     </div>
//   );
// };

// export default Home;


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../firebase_config/config"; // 👈 import your firebase auth
// import logo from "../../public/ContentLabs_2.png";
// import logoGif from '../../public/contentlabsGif2.gif'

// const Home = () => {
//   const navigate = useNavigate();

//   const handleGetStarted = () => {
//     if (auth.currentUser) {
//       // ✅ user already logged in → go to dashboard
//       navigate("/dashboard");
//     } else {
//       // ❌ not logged in → go to signup
//       navigate("/signup");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FDFBF7] to-[#F6F1EB] px-6">
//       {/* Logo */}
//       <div className="flex items-center justify-center border-black/20 px-8 mb-6">
//         <img src={logo} alt="Logo" className="h-30 w-auto" />
//       </div>

//       {/* Text + SVG side by side */}
//       <div className="flex flex-row md:flex-row items-center md:items-start md:justify-center gap-6 max-w-4xl mb-8">
//         {/* Intro Text */}
//         <div className="text-center md:text-left max-w-md">
//           <h1 className="text-2xl font-semibold text-gray-800 mb-3">
//             Welcome to Content LABS 🚀
//           </h1>
//           <p className="text-gray-600">
//             To access your dashboard, please sign up or log in using your
//             account. Once you’re signed in, you’ll be redirected to your
//             personalized dashboard where you can start working with Content LABS.
//           </p>
//         </div>

//         {/* SVG (example illustration) */}
//         <div className="w-40 h-40 md:w-56 md:h-56">
//           <img
//             src={logoGif}
//             alt="GIF Illustration"
//             className="w-full h-full object-contain"
//           />
//         </div>

//       </div>

//       {/* Get Started Button */}
//       <button
//         onClick={handleGetStarted}
//         className="bg-[#E6A24B] hover:bg-[#d68d32] text-white text-lg font-medium py-3 px-8 rounded-lg shadow-md transition-all duration-300"
//       >
//         Get Started
//       </button>
//     </div >
//   );
// };

// export default Home;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../firebase_config/config"; // 👈 import your firebase auth
// import logo from "../../public/ContentLabs_2.png";
// import logoGif from "../../public/contentlabsGif2.gif";

// const Home = () => {
//   const navigate = useNavigate();

//   const handleGetStarted = () => {
//     if (auth.currentUser) {
//       // ✅ user already logged in → go to dashboard
//       navigate("/dashboard");
//     } else {
//       // ❌ not logged in → go to signup
//       navigate("/signup");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FDFBF7] to-[#F6F1EB] px-6">
//       {/* Logo */}
//       <div className="flex items-center justify-center border-black/20 px-8 mb-6">
//         <img src={logo} alt="Logo" className="h-30 w-auto" />
//       </div>

//       {/* Text + GIF side by side */}
//       <div className="flex flex-row md:flex-row items-center md:items-cen md:justify-center gap-12 max-w-6xl w-full">
//         {/* Left side (Text + Button) */}
//         <div className="flex flex-col text-center md:text-left max-w-md">
//           <h1 className="text-3xl font-semibold text-gray-800 mb-4">
//             Welcome to Content LABS 🚀
//           </h1>
//           <p className="text-gray-600 mb-6">
//             To access your dashboard, please sign up or log in using your
//             account. Once you’re signed in, you’ll be redirected to your
//             personalized dashboard where you can start working with Content LABS.
//           </p>
//           <button
//             onClick={handleGetStarted}
//             className="self-center md:self-start bg-[#E6A24B] hover:bg-[#d68d32] text-white text-lg font-medium py-3 px-8 rounded-lg shadow-md transition-all duration-300"
//           >
//             Get Started
//           </button>
//         </div>

//         {/* Right side (GIF) */}
//         <div className="w-60 h-60 md:w-80 md:h-80 flex-shrink-0">
//           <img
//             src={logoGif}
//             alt="GIF Illustration"
//             className="w-full h-full object-contain"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase_config/config"; // 👈 import your firebase auth
import logo from "../../public/ContentLabs_2.png";
import logoGif from "../../public/contentlabsGif2.gif";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (auth.currentUser) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FDFBF7] to-[#F6F1EB] px-6">
      
      {/* Text + GIF side by side */}
      <div className="flex flex-row md:flex-row items-center md:items-center md:justify-center gap-16 max-w-6xl w-full">
        
        {/* Left side (Logo + Text + Button) */}
        <div className="flex flex-col text-center md:text-left max-w-l">
          
          {/* Main Logo on top */}
          <div className=" flex justify-start md:justify-start ">
            <img src={logo} alt="Main Logo" className="h-24 md:h-32 w-auto" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-semibold text-gray-800 my-3">
            Welcome to Content LABS 🚀 <br />
            Automate All Your Document Work
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-4">
            To access your dashboard, please sign up or log in using your
            account. Once you’re signed in, you’ll be redirected to your
            personalized dashboard where you can start working with Content LABS.
          </p>

          {/* Button */}
          <button
            onClick={handleGetStarted}
            className="self-center md:self-start bg-[#E6A24B] hover:bg-[#d68d32] text-white text-lg font-medium py-3 px-8 rounded-lg shadow-md transition-all duration-300"
          >
            Get Started
          </button>
        </div>

        {/* Right side (Bigger GIF) */}
        <div className="w-80 h-80 md:w-[36rem] md:h-[36rem] flex-shrink-0">
          <img
            src={logoGif}
            alt="GIF Illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

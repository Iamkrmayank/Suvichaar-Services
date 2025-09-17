// import { Link } from "react-router-dom";
// import { auth, db } from "../firebase_config/config";
// import { useEffect, useState } from "react";
// import { getDoc,doc } from "firebase/firestore";

// function Home() {
//   const [userDetails, setUserDetails] = useState("")

//   const fetchUserData = async () => {
//     auth.onAuthStateChanged(async (user) => {
//       console.log(user);
//       console.log(user.displayName);
//       const docRef = doc(db, "Users", user.uid);
//       const docSnap = await getDoc(docRef);

//       if(docSnap.exists())
//       {
//           setUserDetails(docSnap.data());
//           console.log(docSnap.data());
//       }
//       else{
//         console.log("User is not Logged In");
//       }
//     });
//   }
//   useEffect(() => {
//     fetchUserData()
//   }, []);
//   return (
//     <div style={{ textAlign: "center", padding: "50px" }}>
//       <h1>Welcome {userDetails.firstName} {userDetails.lastName}</h1>
//       <p>This is the home page.</p>
//       <Link to="/login"><button>Login</button></Link>
//       <Link to="/signup"><button style={{ marginLeft: "10px" }}>Sign Up</button></Link>
//     </div>
//   );
// }

// export default Home;


// import { Link, useNavigate } from "react-router-dom";
// import { auth, db } from "../firebase_config/config";
// import { useEffect, useState } from "react";
// import { getDoc, doc } from "firebase/firestore";
// import { signOut } from "firebase/auth";

// function Home() {
//   const [userDetails, setUserDetails] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const fetchUserData = async () => {
//     auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         const docRef = doc(db, "Users", user.uid);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setUserDetails({ ...docSnap.data(), photoURL: user.photoURL });
//         } else {
//           // For Google sign-in users (no Firestore doc yet)
//           setUserDetails({
//             firstName: user.displayName?.split(" ")[0] || "",
//             lastName: user.displayName?.split(" ")[1] || "",
//             photoURL: user.photoURL,
//           });
//         }
//       } else {
//         setUserDetails(null);
//       }
//     });
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const handleLogout = async () => {
//     await signOut(auth);
//     setUserDetails(null);
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
//       {/* Navbar */}
//       <div className="w-full flex justify-between items-center mb-12">
//         <h1 className="text-2xl font-bold">My App</h1>

//         {userDetails ? (
//           <div className="relative">
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-lg font-bold overflow-hidden focus:outline-none"
//             >
//               {userDetails.photoURL ? (
//                 <img
//                   src={userDetails.photoURL}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 userDetails.firstName?.charAt(0).toUpperCase()
//               )}
//             </button>

//             {/* Dropdown */}
//             {menuOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2">
//                 <button
//                   onClick={() => {
//                     setMenuOpen(false);
//                     navigate("/settings");
//                   }}
//                   className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
//                 >
//                   Settings
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-red-400"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div>
//             <Link to="/login">
//               <button className="px-4 py-2 bg-cyan-600 rounded-md">Login</button>
//             </Link>
//             <Link to="/signup">
//               <button className="px-4 py-2 bg-cyan-600 rounded-md ml-2">Sign Up</button>
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* Welcome message */}
//       <h2 className="text-3xl font-semibold">
//         {userDetails
//           ? `Welcome ${userDetails.firstName} ${userDetails.lastName || ""}`
//           : "Welcome Guest"}
//       </h2>
//       <p className="mt-4 text-gray-400">This is the home page.</p>
//     </div>
//   );
// }

// export default Home;


// import { Link } from "react-router-dom";
// import { auth, db } from "../firebase_config/config";
// import { useEffect, useState } from "react";
// import { getDoc, doc, count } from "firebase/firestore";
// import { signOut } from "firebase/auth";

// function Home() {
//   const [userDetails, setUserDetails] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         let userData = {
//           email: user.email,
//           photoURL: user.photoURL,
//         };
//         console.log("Google Profile : ", user.photoURL);
//         // If Google login → use displayName + photoURL directly
//         if (user.providerData[0]?.providerId === "google.com") {
//           const [firstName, lastName = ""] = user.displayName
//             ? user.displayName.split(" ")
//             : ["", ""];
//           userData = { ...userData, firstName, lastName };
//         } else {
//           // If email/password → fetch from Firestore
//           const docRef = doc(db, "Users", user.uid);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             userData = { ...userData, ...docSnap.data() };
//           }
//         }
//         console.log("User : ", userData);
//         setUserDetails(userData);
//         console.log("User Details", userDetails);
//       } else {
//         setUserDetails(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);
//   // useEffect(() => {
//   //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
//   //     if (user) {
//   //       await user.reload(); // 🔑 Force refresh user data
//   //       const refreshedUser = auth.currentUser;

//   //       let userData = {
//   //         email: refreshedUser.email,
//   //         photoURL: refreshedUser.photoURL,
//   //       };

//   //       if (refreshedUser.providerData[0]?.providerId === "google.com") {
//   //         const [firstName, lastName = ""] = refreshedUser.displayName
//   //           ? refreshedUser.displayName.split(" ")
//   //           : ["", ""];
//   //         userData = { ...userData, firstName, lastName };
//   //       } else {
//   //         const docRef = doc(db, "Users", refreshedUser.uid);
//   //         const docSnap = await getDoc(docRef);
//   //         if (docSnap.exists()) {
//   //           userData = { ...userData, ...docSnap.data() };
//   //         }
//   //       }

//   //       setUserDetails(userData);
//   //     } else {
//   //       setUserDetails(null);
//   //     }
//   //   });

//   //   return () => unsubscribe();
//   // }, []);

//   const handleLogout = async () => {
//     await signOut(auth);
//     setUserDetails(null);
//   };
//   // console.log("USer Details : ", userDetails.photoURL);
//   // console.log("Profile Pic : ", userDetails.firstName);
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900 text-white">
//       <div className="absolute top-5 right-5">
//         {userDetails ? (
//           <div className="relative">
//             {/* Profile Button */}
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold text-white focus:outline-none border border-gray-600 hover:border-cyan-400"
//             >
//               {userDetails.photoURL ? (
//                 <img
//                   src={userDetails.photoURL}
//                   alt="Profile"
//                   className="w-12 h-12 rounded-full object-cover"
//                 />
//               ) : (
//                 userDetails.firstName?.charAt(0).toUpperCase() || "U"
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
//           let userData;

//           // Check if Google login
//           if (user.providerData[0]?.providerId === "google.com") {
//             const [firstName, lastName = ""] = user.displayName
//               ? user.displayName.split(" ")
//               : ["", ""];
//             userData = {
//               email: user.email,
//               firstName,
//               lastName,
//               photoURL: user.photoURL,
//             };
//           } else {
//             // Email/password → fetch from Firestore
//             const docRef = doc(db, "Users", user.uid);
//             const docSnap = await getDoc(docRef);
//             if (docSnap.exists()) {
//               userData = { ...docSnap.data(), email: user.email };
//             }
//           }

//           setUserDetails(userData);
//           console.log("✅ Loaded User Data:", userData);
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
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900 text-white">
//       <div className="absolute top-5 right-5">
//         <img src={userDetails.photoURL} alt="" />
//         {userDetails ? (
//           <div className="relative">
//             {/* Profile Button */}
//             {/* <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold text-white focus:outline-none border border-gray-600 hover:border-cyan-400"
//             >
//               {userDetails.photoURL ? (
//                 <img
//                   src={userDetails.photoURL}
//                   alt="Profile"
//                   className="w-12 h-12 rounded-full object-cover"
//                 />
//               ) : (
//                 userDetails.firstName?.charAt(0).toUpperCase() || "U"
//               )}
//             </button> */}
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="w-12 h-12 rounded-full border border-gray-600 hover:border-cyan-400 focus:outline-none overflow-hidden"
//             >
//               {userDetails.photoURL ? (
//                 <img
//                   src={userDetails.photoURL}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="w-full h-full flex items-center justify-center bg-gray-700 text-xl font-bold text-white">
//                   {userDetails.firstName?.charAt(0).toUpperCase() || "U"}
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
//           let userData;

//           // Google login → use displayName + photoURL
//           if (user.providerData[0]?.providerId === "google.com") {
//             const [firstName, lastName = ""] = user.displayName
//               ? user.displayName.split(" ")
//               : ["", ""];
//             userData = {
//               email: user.email,
//               firstName,
//               lastName,
//               photoURL: user.photoURL,
//             };
//           } else {
//             // Email/password → fetch from Firestore
//             const docRef = doc(db, "Users", user.uid);
//             const docSnap = await getDoc(docRef);
//             if (docSnap.exists()) {
//               userData = { ...docSnap.data(), email: user.email };
//             }
//           }

//           setUserDetails(userData);
//           console.log("✅ Loaded User Data:", userData);
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
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900 text-white">
//       <div className="absolute top-5 right-5">
//         {userDetails ? (
//           <div className="relative">
//             {/* Profile Button */}
//             {/* <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="w-12 h-12 rounded-full border border-gray-600 hover:border-cyan-400 focus:outline-none overflow-hidden"
//             >
//               {userDetails?.photoURL ? (
//                 <img
//                   src={userDetails.photoURL}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="w-full h-full flex items-center justify-center bg-gray-700 text-xl font-bold text-white">
//                   {userDetails?.firstName?.charAt(0).toUpperCase() || "U"}
//                 </span>
//               )}
//             </button> */}
//             {/* {userDetails?.photoURL && (
//               <div className="mt-6">
//                 <h2 className="text-lg">Profile Image Test:</h2>
//                 <img
//                   src={userDetails.photoURL}
//                   alt="Google Profile"
//                   className="w-32 h-32 rounded-full border-2 border-white object-cover"
//                 />
//               </div>
//             )} */}
//             <div>
//               <h2>Direct Test</h2>
//               <img src='https://lh3.googleusercontent.com/a/ACg8ocI45xTfOO8kyyJ5DGD2onSzr-jThyl04pZyZv-NSe_VfVWWIZM=s96-c' alt="Profile" width="150" height="150" />
//             </div>

//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="w-12 h-12 rounded-full border border-gray-600 hover:border-cyan-400 focus:outline-none overflow-hidden flex items-center justify-center"
//             >
//               {userDetails?.photoURL ? (
//                 <img
//                   src={userDetails.photoURL}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="w-full h-full flex items-center justify-center bg-gray-700 text-xl font-bold text-white">
//                   {userDetails?.firstName?.charAt(0).toUpperCase() || "U"}
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

import { Link } from "react-router-dom";
import { auth, db } from "../firebase_config/config";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";

function Home() {
  const [userDetails, setUserDetails] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);

          // If Firestore document exists, use it
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            console.log("✅ Loaded User Data from Firestore:", docSnap.data());
          } else {
            // Fallback: construct minimal user info
            setUserDetails({
              email: user.email,
              displayName: user.displayName || "",
              photoURL: user.photoURL || "",
            });
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      } else {
        setUserDetails(null);
      }
    });
    console.log("User photoURL:", userDetails?.photoURL);

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUserDetails(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900 text-white">
      <div className="absolute top-5 right-5">
        {userDetails ? (
          <div className="relative">
            {/* Profile Button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-12 h-12 rounded-full border border-gray-600 hover:border-cyan-400 focus:outline-none overflow-hidden flex items-center justify-center"
            >
              {userDetails?.photoURL ? (
                <img
                  src={userDetails.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  // className="w-12 h-12 rounded-full border ..."

                />
              ) : (
                <span className="w-full h-full flex items-center justify-center bg-gray-700 text-xl font-bold text-white">
                  {userDetails?.firstName?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-gray-200 hover:bg-gray-700"
                >
                  Logout
                </button>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
                >
                  Settings
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button className="px-4 py-2 bg-cyan-500 rounded-lg hover:bg-cyan-600">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="ml-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>

      <h1 className="text-3xl font-bold">
        Welcome{" "}
        {userDetails
          ? `${userDetails.firstName || ""} ${userDetails.lastName || ""}`
          : "Guest"}
      </h1>
      <p className="text-gray-300">This is the home page.</p>
    </div>
  );
}

export default Home;

// import React, { useEffect, useState } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db } from "../firebase_config/config";
// import { doc, getDoc } from "firebase/firestore";
// import LoadingScreen from "./Loading";

// const ProtectedRoute = ({ children }) => {
//   const [user, loading] = useAuthState(auth);
//   const [accepted, setAccepted] = useState(null);
//   const [checking, setChecking] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     const checkTerms = async () => {
//       if (user) {
//         const snap = await getDoc(doc(db, "Users", user.uid));
//         setAccepted(snap.exists() ? snap.data().acceptedTerms || false : false);
//       }
//       setChecking(false);
//     };

//     if (!loading) checkTerms();
//   }, [user, loading]);

//   if (loading || checking) {
//     return <LoadingScreen message="Checking authentication..." />;
//   }

//   // --- NOT LOGGED IN ---
//   if (!user) {
//     if (location.pathname === "/login" || location.pathname === "/signup") {
//       return children; // allow login/signup if logged out
//     }
//     return <Navigate to="/" replace />;
//   }

//   // --- LOGGED IN BUT NOT ACCEPTED TERMS ---
//   if (!accepted) {
//     if (location.pathname === "/terms") {
//       return children; // allow terms
//     }
//     return <Navigate to="/terms" replace />;
//   }

//   // --- LOGGED IN & ACCEPTED TERMS ---
//   if (accepted) {
//     if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/terms") {
//       return <Navigate to="/dashboard" replace />;
//     }
//     return children; // allow dashboard & other protected routes
//   }

//   return children;
// };

// export default ProtectedRoute;



// import React, { useEffect, useState } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db } from "../firebase_config/config";
// import { doc, onSnapshot } from "firebase/firestore";
// import LoadingScreen from "./Loading";

// const ProtectedRoute = ({ children }) => {
//   const [user, loading] = useAuthState(auth);
//   const [accepted, setAccepted] = useState(null);
//   const [checking, setChecking] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     let unsub;

//     if (user) {
//       const userRef = doc(db, "Users", user.uid);

//       // 🔥 Listen to changes in real-time
//       unsub = onSnapshot(userRef, (snap) => {
//         setAccepted(snap.exists() ? snap.data().acceptedTerms || false : false);
//         setChecking(false);
//       });
//     } else {
//       setChecking(false);
//     }

//     return () => unsub && unsub();
//   }, [user]);

//   if (loading || checking) {
//     return <LoadingScreen message="Checking authentication..." />;
//   }

//   // --- NOT LOGGED IN ---
//   if (!user) {
//     if (location.pathname === "/login" || location.pathname === "/signup") {
//       return children; // allow login/signup if logged out
//     }
//     return <Navigate to="/" replace />;
//   }

//   // --- LOGGED IN BUT NOT ACCEPTED TERMS ---
//   if (!accepted) {
//     if (location.pathname === "/terms") {
//       return children; // allow terms page
//     }
//     return <Navigate to="/terms" replace />;
//   }

//   // --- LOGGED IN & ACCEPTED TERMS ---
//   if (accepted) {
//     if (
//       location.pathname === "/login" ||
//       location.pathname === "/signup" ||
//       location.pathname === "/terms"
//     ) {
//       return <Navigate to="/dashboard" replace />;
//     }
//     return children; // allow dashboard & other protected routes
//   }

//   return children;
// };

// export default ProtectedRoute;


import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase_config/config";
import { doc, getDoc } from "firebase/firestore";
import LoadingScreen from "./Loading";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [accepted, setAccepted] = useState(null); // null = not checked yet
  const [checking, setChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkTerms = async () => {
      if (user) {
        try {
          const snap = await getDoc(doc(db, "Users", user.uid));
          if (snap.exists()) {
            setAccepted(snap.data().acceptedTerms || false);
          } else {
            setAccepted(false);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setAccepted(false);
        }
      }
      setChecking(false);
    };

    if (!loading) checkTerms();
  }, [user, loading]);

  // --- WAIT while Firebase / Firestore loads ---
  if (loading || checking) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  // --- NOT LOGGED IN ---
  if (!user) {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      return children; // allow login/signup if logged out
    }
    return <Navigate to="/" replace />;
  }

  // --- LOGGED IN BUT NOT ACCEPTED TERMS ---
  if (accepted === false) {
    if (location.pathname === "/terms") {
      return children; // allow terms page
    }
    return <Navigate to="/terms" replace />;
  }

  // --- LOGGED IN & ACCEPTED TERMS ---
  if (accepted === true) {
    if (
      location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname === "/terms"
    ) {
      return <Navigate to="/dashboard" replace />;
    }
    return children; // allow dashboard & other protected routes
  }

  return <LoadingScreen message="Finalizing access..." />;
};

export default ProtectedRoute;

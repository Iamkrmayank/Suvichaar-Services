// // 
// // src/components/Admin_Dashboard/AdminRoute.jsx
// import React from "react";
// import { Navigate } from "react-router-dom";

// const AdminRoute = ({ children }) => {
//   const userData = JSON.parse(localStorage.getItem("userData"));

//   // If no userData → not logged in
//   if (!userData) {
//     return <Navigate to="/admin-login" replace />;
//   }

//   // If not admin → block
//   if (!userData.isAdmin) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };

// export default AdminRoute;


// src/components/Admin_Dashboard/AdminRoute.jsx

// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { auth } from "../../firebase_config/config";

// const AdminRoute = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const checkClaims = async () => {
//       const user = auth.currentUser;
//       if (!user) {
//         setLoading(false);
//         return;
//       }

//       const tokenResult = await user.getIdTokenResult(true);
//       setIsAdmin(!!tokenResult.claims.admin);

//       // Keep localStorage in sync
//       const userData = {
//         uid: user.uid,
//         email: user.email,
//         isAdmin: !!tokenResult.claims.admin,
//       };
//       localStorage.setItem("userData", JSON.stringify(userData));

//       setLoading(false);
//     };

//     checkClaims();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   if (!isAdmin) return <Navigate to="/dashboard" replace />;

//   return children;
// };

// export default AdminRoute;


import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase_config/config";

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        // 🔥 Always refresh claims on reload
        const tokenResult = await user.getIdTokenResult(true);
        const admin = !!tokenResult.claims.admin;

        setIsAdmin(admin);

        // optional: keep localStorage in sync
        localStorage.setItem(
          "userData",
          JSON.stringify({
            uid: user.uid,
            email: user.email,
            isAdmin: admin,
          })
        );
      } catch (err) {
        console.error("Error checking admin claims:", err);
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return children;
};

export default AdminRoute;

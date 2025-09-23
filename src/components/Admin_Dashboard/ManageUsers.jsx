// // export default ManageUsers;
// import React, { useEffect, useState } from "react";
// import { collection, getDocs, query, orderBy } from "firebase/firestore";
// import { db } from "../../firebase_config/config";
// import { Users } from "lucide-react";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         // Get all users ordered by createdAt
//         const q = query(collection(db, "Users"), orderBy("createdAt", "asc"));
//         const snap = await getDocs(q);

//         const list = snap.docs.map((docSnap) => {
//           const data = docSnap.data();

//           // Format createdAt
//           let createdAt = data.createdAt;
//           if (createdAt?.seconds) {
//             createdAt = new Date(createdAt.seconds * 1000).toLocaleString();
//           } else if (typeof createdAt === "string") {
//             createdAt = new Date(createdAt).toLocaleString();
//           }

//           return {
//             id: docSnap.id,
//             displayName: data.displayName || "—",
//             accountId: data.accountId || "—",
//             email: data.email || "—",
//             createdAt: createdAt || "—",
//           };
//         });

//         setUsers(list);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-6">
//         <Users className="w-7 h-7 text-[#E6A24B]" />
//         <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
//       </div>

//       {/* Stats Card */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//         <div className="shadow rounded-xl p-6 flex flex-col items-center justify-center border border-gray-200">
//           <h2 className="text-gray-700 text-sm font-medium">Total Users</h2>
//           <p className="text-3xl font-extrabold text-gray-900">{users.length}</p>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead className="bg-gray-100 text-gray-700 text-left sticky top-0 shadow">
//               <tr>
//                 <th className="p-4 font-semibold">Display Name</th>
//                 <th className="p-4 font-semibold">Account ID</th>
//                 <th className="p-4 font-semibold">Email</th>
//                 <th className="p-4 font-semibold">Created At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={4} className="p-6 text-center text-gray-500">
//                     Loading users...
//                   </td>
//                 </tr>
//               ) : users.length > 0 ? (
//                 users.map((u, idx) => (
//                   <tr
//                     key={u.id}
//                     className={`${
//                       idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//                     } hover:bg-[#FFF8F0] transition`}
//                   >
//                     <td className="p-4">{u.displayName}</td>
//                     <td className="p-4 font-mono text-xs text-gray-600">
//                       {u.accountId}
//                     </td>
//                     <td className="p-4">{u.email}</td>
//                     <td className="p-4">{u.createdAt}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={4} className="p-6 text-center text-gray-500">
//                     No users found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;

// import React, { useEffect, useState } from "react";
// import { collection, getDocs, query, orderBy } from "firebase/firestore";
// import { db } from "../../firebase_config/config";
// import { Users, Coins } from "lucide-react";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         // Get all users ordered by createdAt (oldest first)
//         const q = query(collection(db, "Users"), orderBy("createdAt", "asc"));
//         const snap = await getDocs(q);

//         const list = snap.docs.map((docSnap) => {
//           const data = docSnap.data();

//           // Format createdAt
//           let createdAt = data.createdAt;
//           if (createdAt?.seconds) {
//             createdAt = new Date(createdAt.seconds * 1000).toLocaleString();
//           } else if (typeof createdAt === "string") {
//             createdAt = new Date(createdAt).toLocaleString();
//           }

//           return {
//             id: docSnap.id,
//             displayName: data.displayName || "—",
//             accountId: data.accountId || "—",
//             email: data.email || "—",
//             createdAt: createdAt || "—",
//           };
//         });

//         setUsers(list);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // 🔹 Handle credits button click
//   const handleOpenCredits = (userId) => {
//     alert(`Open credits for user: ${userId}`);
//     // Later you can:
//     // - Open a modal
//     // - Navigate to a credits page
//     // - Fetch credits from Firestore
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-6">
//         <Users className="w-7 h-7 text-[#E6A24B]" />
//         <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
//       </div>

//       {/* Stats Card */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//         <div className="shadow rounded-xl p-6 flex flex-col items-center justify-center border border-gray-200">
//           <h2 className="text-gray-700 text-sm font-medium">Total Users</h2>
//           <p className="text-3xl font-extrabold text-gray-900">{users.length}</p>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead className="bg-gray-100 text-gray-700 text-left sticky top-0 shadow">
//               <tr>
//                 <th className="p-4 font-semibold">Display Name</th>
//                 <th className="p-4 font-semibold">Account ID</th>
//                 <th className="p-4 font-semibold">Email</th>
//                 <th className="p-4 font-semibold">Created At</th>
//                 <th className="p-4 font-semibold text-center">Credits</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="p-6 text-center text-gray-500">
//                     Loading users...
//                   </td>
//                 </tr>
//               ) : users.length > 0 ? (
//                 users.map((u, idx) => (
//                   <tr
//                     key={u.id}
//                     className={`${
//                       idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//                     } hover:bg-[#FFF8F0] transition`}
//                   >
//                     <td className="p-4">{u.displayName}</td>
//                     <td className="p-4 font-mono text-xs text-gray-600">
//                       {u.accountId}
//                     </td>
//                     <td className="p-4">{u.email}</td>
//                     <td className="p-4">{u.createdAt}</td>
//                     <td className="p-4 text-center">
//                       <button
//                         onClick={() => handleOpenCredits(u.id)}
//                         className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#E6A24B] text-white rounded-lg shadow hover:bg-[#d28c32] transition"
//                       >
//                         <Coins className="w-4 h-4" />
//                         Open
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="p-6 text-center text-gray-500">
//                     No users found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;


// import React, { useEffect, useState } from "react";
// import { collection, getDocs, query, orderBy } from "firebase/firestore";
// import { db } from "../../firebase_config/config";
// import { Users, Coins } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const q = query(collection(db, "Users"), orderBy("createdAt", "asc"));
//         const snap = await getDocs(q);

//         const list = snap.docs.map((docSnap) => {
//           const data = docSnap.data();

//           let createdAt = data.createdAt;
//           if (createdAt?.seconds) {
//             createdAt = new Date(createdAt.seconds * 1000).toLocaleString();
//           } else if (typeof createdAt === "string") {
//             createdAt = new Date(createdAt).toLocaleString();
//           }

//           return {
//             id: docSnap.id,
//             displayName: data.displayName || "—",
//             accountId: data.accountId || "—",
//             email: data.email || "—",
//             createdAt: createdAt || "—",
//           };
//         });

//         setUsers(list);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // 🔹 Navigate to User Credits Page
//   const handleOpenCredits = (userId) => {
//     navigate(`/admin/user-credits/${userId}`);
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-6">
//         <Users className="w-7 h-7 text-[#E6A24B]" />
//         <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//         <div className="shadow rounded-xl p-6 flex flex-col items-center justify-center border border-gray-200">
//           <h2 className="text-gray-700 text-sm font-medium">Total Users</h2>
//           <p className="text-3xl font-extrabold text-gray-900">{users.length}</p>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead className="bg-gray-100 text-gray-700 text-left sticky top-0 shadow">
//               <tr>
//                 <th className="p-4 font-semibold">Display Name</th>
//                 <th className="p-4 font-semibold">Account ID</th>
//                 <th className="p-4 font-semibold">Email</th>
//                 <th className="p-4 font-semibold">Created At</th>
//                 <th className="p-4 font-semibold text-center">Credits</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="p-6 text-center text-gray-500">
//                     Loading users...
//                   </td>
//                 </tr>
//               ) : users.length > 0 ? (
//                 users.map((u, idx) => (
//                   <tr
//                     key={u.id}
//                     className={`${
//                       idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//                     } hover:bg-[#FFF8F0] transition`}
//                   >
//                     <td className="p-4">{u.displayName}</td>
//                     <td className="p-4 font-mono text-xs text-gray-600">
//                       {u.accountId}
//                     </td>
//                     <td className="p-4">{u.email}</td>
//                     <td className="p-4">{u.createdAt}</td>
//                     <td className="p-4 text-center">
//                       <button
//                         onClick={() => handleOpenCredits(u.id)}
//                         className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#E6A24B] text-white rounded-lg shadow hover:bg-[#d28c32] transition"
//                       >
//                         <Coins className="w-4 h-4" />
//                         Open
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="p-6 text-center text-gray-500">
//                     No users found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;


// import React, { useEffect, useState } from "react";
// import { collection, getDocs, query, orderBy } from "firebase/firestore";
// import { db, auth } from "../../firebase_config/config";
// import { Users, Coins } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         // Ensure only admin can fetch users
//         const user = auth.currentUser;
//         if (!user) return;

//         const tokenResult = await user.getIdTokenResult();
//         if (!tokenResult.claims.admin) {
//           console.warn("⛔ Not authorized to fetch users");
//           setUsers([]);
//           return;
//         }

//         // Fetch users ordered by createdAt
//         const q = query(collection(db, "Users"), orderBy("createdAt", "asc"));
//         const snap = await getDocs(q);

//         const list = snap.docs.map((docSnap) => {
//           const data = docSnap.data();

//           let createdAt = "—";
//           if (data?.createdAt) {
//             try {
//               createdAt = data.createdAt.toDate().toLocaleString();
//             } catch {
//               if (typeof data.createdAt === "string") {
//                 createdAt = new Date(data.createdAt).toLocaleString();
//               }
//             }
//           }

//           return {
//             id: docSnap.id,
//             displayName: data?.displayName || "—",
//             accountId: data?.accountId || "—",
//             email: data?.email || "—",
//             createdAt,
//           };
//         });

//         setUsers(list);
//       } catch (err) {
//         console.error("❌ Error fetching users:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // 🔹 Navigate to User Credits Page
//   const handleOpenCredits = (userId) => {
//     navigate(`/admin/user-credits/${userId}`);
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-6">
//         <Users className="w-7 h-7 text-[#E6A24B]" />
//         <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//         <div className="shadow rounded-xl p-6 flex flex-col items-center justify-center border border-gray-200">
//           <h2 className="text-gray-700 text-sm font-medium">Total Users</h2>
//           <p className="text-3xl font-extrabold text-gray-900">{users.length}</p>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead className="bg-gray-100 text-gray-700 text-left sticky top-0 shadow">
//               <tr>
//                 <th className="p-4 font-semibold">Display Name</th>
//                 <th className="p-4 font-semibold">Account ID</th>
//                 <th className="p-4 font-semibold">Email</th>
//                 <th className="p-4 font-semibold">Created At</th>
//                 <th className="p-4 font-semibold text-center">Credits</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="p-6 text-center text-gray-500">
//                     Loading users...
//                   </td>
//                 </tr>
//               ) : users.length > 0 ? (
//                 users.map((u, idx) => (
//                   <tr
//                     key={u.id}
//                     className={`${
//                       idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//                     } hover:bg-[#FFF8F0] transition`}
//                   >
//                     <td className="p-4">{u.displayName}</td>
//                     <td className="p-4 font-mono text-xs text-gray-600">
//                       {u.accountId}
//                     </td>
//                     <td className="p-4">{u.email}</td>
//                     <td className="p-4">{u.createdAt}</td>
//                     <td className="p-4 text-center">
//                       <button
//                         onClick={() => handleOpenCredits(u.id)}
//                         className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#E6A24B] text-white rounded-lg shadow hover:bg-[#d28c32] transition"
//                       >
//                         <Coins className="w-4 h-4" />
//                         Open
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="p-6 text-center text-gray-500">
//                     No users found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;


import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db, auth } from "../../firebase_config/config";
import { Users, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // ✅ Ensure only admins can see this page
        const user = auth.currentUser;
        if (!user) return;

        const tokenResult = await user.getIdTokenResult();
        if (!tokenResult.claims.admin) {
          console.warn("⛔ Not authorized to fetch users");
          setUsers([]);
          return;
        }

        // ✅ Fetch users ordered by createdAt
        const q = query(collection(db, "Users"), orderBy("createdAt", "asc"));
        const snap = await getDocs(q);

        const list = snap.docs
  .map((docSnap) => {
    const data = docSnap.data();

    // 🚨 Skip admins (based on Firestore field isAdmin)
    if (data?.isAdmin === true) return null;

    let createdAt = "—";
    if (data?.createdAt) {
      try {
        createdAt = data.createdAt.toDate().toLocaleString();
      } catch {
        if (typeof data.createdAt === "string") {
          createdAt = new Date(data.createdAt).toLocaleString();
        }
      }
    }

    return {
      id: docSnap.id,
      displayName: data?.displayName || "—",
      accountId: data?.accountId || "—",
      email: data?.email || "—",
      createdAt,
    };
  })
  .filter(Boolean); // remove nulls (admins skipped)
 // remove nulls (admins skipped)

        setUsers(list);
      } catch (err) {
        console.error("❌ Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 🔹 Navigate to User Credits Page
  const handleOpenCredits = (userId) => {
    navigate(`/admin/user-credits/${userId}`);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-7 h-7 text-[#E6A24B]" />
        <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="shadow rounded-xl p-6 flex flex-col items-center justify-center border border-gray-200">
          <h2 className="text-gray-700 text-sm font-medium">Total Users</h2>
          <p className="text-3xl font-extrabold text-gray-900">{users.length}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 text-left sticky top-0 shadow">
              <tr>
                <th className="p-4 font-semibold">Display Name</th>
                <th className="p-4 font-semibold">Account ID</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Created At</th>
                <th className="p-4 font-semibold text-center">Credits</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((u, idx) => (
                  <tr
                    key={u.id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-[#FFF8F0] transition`}
                  >
                    <td className="p-4">{u.displayName}</td>
                    <td className="p-4 font-mono text-xs text-gray-600">
                      {u.accountId}
                    </td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4">{u.createdAt}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleOpenCredits(u.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#E6A24B] text-white rounded-lg shadow hover:bg-[#d28c32] transition"
                      >
                        <Coins className="w-4 h-4" />
                        Open
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;

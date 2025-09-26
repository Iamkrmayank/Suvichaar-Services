
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
        const user = auth.currentUser;
        if (!user) return;

        const tokenResult = await user.getIdTokenResult();
        if (!tokenResult.claims.admin) {
          console.warn("⛔ Not authorized to fetch users");
          setUsers([]);
          return;
        }

        const q = query(collection(db, "Users"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);

        const list = snap.docs
          .map((docSnap) => {
            const data = docSnap.data();
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
          .filter(Boolean);

        setUsers(list);
      } catch (err) {
        console.error("❌ Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleOpenCredits = (userId) => {
    navigate(`/admin/user-credits/${userId}`);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-7 h-7 text-[#E6A24B]" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Manage Users
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="shadow rounded-xl p-6 flex flex-col items-center justify-center border border-gray-200">
          <h2 className="text-gray-700 text-sm font-medium">Total Users</h2>
          <p className="text-3xl font-extrabold text-gray-900">{users.length}</p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
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

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : users.length > 0 ? (
          users.map((u) => (
            <div
              key={u.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {u.displayName}
                </h3>
                <button
                  onClick={() => handleOpenCredits(u.id)}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#E6A24B] text-white text-sm rounded-lg shadow hover:bg-[#d28c32] transition"
                >
                  <Coins className="w-4 h-4" />
                  Open
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium">Account ID:</span> {u.accountId}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> {u.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Created At:</span> {u.createdAt}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;

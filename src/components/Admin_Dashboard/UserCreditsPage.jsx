
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase_config/config";
import {
  Coins,
  ArrowLeft,
  Pencil,
  Check,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

const UserCreditsPage = () => {
  const { userId } = useParams();
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [actionType, setActionType] = useState("increment");
  const [changeValue, setChangeValue] = useState(0);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const subColRef = collection(db, "Credits", userId, "UserCredits");
        const snap = await getDocs(subColRef);

        const list = await Promise.all(
          snap.docs.map(async (docSnap) => {
            const data = docSnap.data();
            let serviceName = data.serviceId;

            try {
              const servicesRef = collection(db, "Services");
              const q = query(servicesRef, where("id", "==", data.serviceId));
              const serviceSnap = await getDocs(q);

              if (!serviceSnap.empty) {
                const serviceDoc = serviceSnap.docs[0].data();
                serviceName = serviceDoc.name || data.serviceId;
              }
            } catch (err) {
              console.warn("No service found for", data.serviceId);
            }

            return {
              id: docSnap.id,
              ...data,
              serviceName,
              isActive: data.isActive ?? true,
            };
          })
        );

        setCredits(list);
      } catch (err) {
        console.error("Error fetching credits:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [userId]);

  const startEditing = (credit) => {
    setEditingId(credit.id);
    setActionType("increment");
    setChangeValue(0);
  };

  const saveEdit = async (credit) => {
    try {
      let newTotal =
        actionType === "increment"
          ? credit.total + changeValue
          : credit.total - changeValue;

      if (newTotal < credit.used) {
        alert("Total cannot be less than used credits!");
        return;
      }

      const newAvailable = newTotal - credit.used;

      const creditRef = doc(db, "Credits", userId, "UserCredits", credit.id);
      await updateDoc(creditRef, {
        total: newTotal,
        available: newAvailable,
      });

      setCredits((prev) =>
        prev.map((c) =>
          c.id === credit.id
            ? { ...c, total: newTotal, available: newAvailable }
            : c
        )
      );

      setEditingId(null);
      setChangeValue(0);
    } catch (err) {
      console.error("Error updating credits:", err);
    }
  };

  const toggleActive = async (credit) => {
    try {
      const creditRef = doc(db, "Credits", userId, "UserCredits", credit.id);
      await updateDoc(creditRef, {
        isActive: !credit.isActive,
      });

      setCredits((prev) =>
        prev.map((c) =>
          c.id === credit.id ? { ...c, isActive: !c.isActive } : c
        )
      );
    } catch (err) {
      console.error("Error toggling credit status:", err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Back Button */}
      <Link
        to="/admin/manage-users"
        className="inline-flex items-center gap-2 text-[#E6A24B] hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Manage Users
      </Link>

      <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <Coins className="w-8 h-8 text-[#E6A24B]" />
          <h1 className="text-2xl font-bold text-gray-800">User Credits</h1>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center">Loading credits...</p>
        ) : credits.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700 text-center">
                  <tr>
                    <th className="p-4 font-semibold">Service Name</th>
                    <th className="p-4 font-semibold">Equivalent</th>
                    <th className="p-4 font-semibold">Total</th>
                    <th className="p-4 font-semibold">Used</th>
                    <th className="p-4 font-semibold">Available</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {credits.map((c, idx) => (
                    <tr
                      key={c.id}
                      className={`${
                        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-[#FFF8F0] transition`}
                    >
                      <td className="p-4">{c.serviceName}</td>
                      <td className="p-4">{c.equivalent}</td>
                      <td className="p-4">{c.total}</td>
                      <td className="p-4">{c.used}</td>
                      <td className="p-4">{c.available}</td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleActive(c)}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg font-medium transition ${
                            c.isActive
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                          }`}
                        >
                          {c.isActive ? (
                            <>
                              <ToggleRight className="w-4 h-4" /> Active
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-4 h-4" /> Inactive
                            </>
                          )}
                        </button>
                      </td>
                      <td className="p-4">
                        {editingId === c.id ? (
                          <div className="flex items-center gap-2">
                            <select
                              value={actionType}
                              onChange={(e) => setActionType(e.target.value)}
                              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                              <option value="increment">Increment</option>
                              <option value="decrement">Decrement</option>
                            </select>
                            <input
                              type="number"
                              value={changeValue}
                              onChange={(e) =>
                                setChangeValue(Number(e.target.value))
                              }
                              className="border border-gray-300 p-2 rounded-lg w-24 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <button
                              onClick={() => saveEdit(c)}
                              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                              <Check className="w-4 h-4 mr-1" /> Done
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startEditing(c)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            <Pencil className="w-4 h-4 mr-1" /> Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {credits.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {c.serviceName}
                    </h3>
                    <button
                      onClick={() => toggleActive(c)}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium transition ${
                        c.isActive
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      {c.isActive ? (
                        <>
                          <ToggleRight className="w-4 h-4" /> Active
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-4 h-4" /> Inactive
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Equivalent:</span>{" "}
                    {c.equivalent}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Total:</span> {c.total}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Used:</span> {c.used}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Available:</span>{" "}
                    {c.available}
                  </p>

                  {editingId === c.id ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <select
                        value={actionType}
                        onChange={(e) => setActionType(e.target.value)}
                        className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="increment">Increment</option>
                        <option value="decrement">Decrement</option>
                      </select>
                      <input
                        type="number"
                        value={changeValue}
                        onChange={(e) => setChangeValue(Number(e.target.value))}
                        className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <button
                        onClick={() => saveEdit(c)}
                        className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        <Check className="w-4 h-4 mr-1" /> Done
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEditing(c)}
                      className="mt-3 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <Pencil className="w-4 h-4 mr-1" /> Edit
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center">No credits found.</p>
        )}
      </div>
    </div>
  );
};

export default UserCreditsPage;

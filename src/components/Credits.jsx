import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase_config/config";
import { collection, getDocs } from "firebase/firestore";

const Credits = () => {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setCredits([]);
          setLoading(false);
          return;
        }

        // 1. Fetch all services
        const servicesSnap = await getDocs(collection(db, "Services"));
        const serviceMap = {};
        servicesSnap.forEach((doc) => {
          const data = doc.data();
          serviceMap[data.id] = data.name || "Unnamed Service"; // use 'id' field, not doc.id
        });

        console.log("🔥 Services Map:", serviceMap);

        // 2. Fetch user credits
        const creditsRef = collection(db, "Credits", user.uid, "UserCredits");
        const snapshot = await getDocs(creditsRef);

        const creditsData = snapshot.docs.map((creditDoc) => {
          const creditData = creditDoc.data();
          const serviceId = creditData.serviceId;

          console.log("📌 Credit Record:", creditData);
          console.log("👉 Matching Service Name:", serviceMap[serviceId]);

          return {
            id: creditDoc.id,
            serviceName: serviceMap[serviceId] || "Unknown Service",
            serviceId,
            ...creditData,
          };
        });

        setCredits(creditsData);
      } catch (error) {
        console.error("Error fetching credits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading credits...
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Credits</h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white text-left text-sm uppercase tracking-wider">
              <th className="py-4 px-6 border-b border-gray-700">Service Name</th>
              <th className="py-4 px-6 border-b border-gray-700">Service ID</th>
              <th className="py-4 px-6 border-b border-gray-700">Total Credits</th>
              <th className="py-4 px-6 border-b border-gray-700">Used</th>
              <th className="py-4 px-6 border-b border-gray-700">Available</th>
              <th className="py-4 px-6 border-b border-gray-700">Equivalent</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {credits.length > 0 ? (
              credits.map((credit, index) => (
                <tr
                  key={credit.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-yellow-50 transition`}
                >
                  <td className="py-4 px-6 border-b border-gray-200 font-medium">
                    {credit.serviceName}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {credit.serviceId}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {credit.total}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {credit.used}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200 text-green-600 font-semibold">
                    {credit.available}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {credit.equivalent}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-6 text-center text-gray-500 italic border-t border-gray-200"
                >
                  No credits found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Credits;

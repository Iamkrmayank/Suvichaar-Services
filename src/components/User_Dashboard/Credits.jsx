
import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase_config/config";
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

        // Fetch all services
        const servicesSnap = await getDocs(collection(db, "Services"));
        const serviceMap = {};
        servicesSnap.forEach((doc) => {
          const data = doc.data();
          serviceMap[data.id] = data.name || "Unnamed Service";
        });

        // Fetch user credits
        const creditsRef = collection(db, "Credits", user.uid, "UserCredits");
        const snapshot = await getDocs(creditsRef);

        const creditsData = snapshot.docs.map((creditDoc) => {
          const creditData = creditDoc.data();
          const serviceId = creditData.serviceId;

          return {
            id: creditDoc.id,
            serviceName: serviceMap[serviceId] || "Unknown Service",
            serviceId,
            isActive: creditData.isActive ?? true,
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
    <div className="p-4 md:p-8 min-h-screen bg-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 md:mb-8 text-center md:text-left">
        Your Credits
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[700px] sm:min-w-full bg-white shadow-lg rounded-xl border border-gray-200">
          <thead>
            <tr className="bg-gray-800 text-white text-xs sm:text-sm uppercase tracking-wider text-center">
              <th className="py-3 px-2 sm:px-6 border-b border-gray-700">Service Name</th>
              <th className="py-3 px-2 sm:px-6 border-b border-gray-700">Service ID</th>
              <th className="py-3 px-2 sm:px-6 border-b border-gray-700">Total Credits</th>
              <th className="py-3 px-2 sm:px-6 border-b border-gray-700">Used Credits</th>
              <th className="py-3 px-2 sm:px-6 border-b border-gray-700">Available Credits</th>
              <th className="py-3 px-2 sm:px-6 border-b border-gray-700">Equivalent</th>
              <th className="py-3 px-2 sm:px-6 border-b border-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-xs sm:text-sm">
            {credits.length > 0 ? (
              credits.map((credit, index) => (
                <tr
                  key={credit.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-yellow-50 transition`}
                >
                  <td className="py-2 sm:py-4 px-1 sm:px-6 border-b border-gray-200 font-medium text-center">
                    {credit.serviceName}
                  </td>
                  <td className="py-2 sm:py-4 px-1 sm:px-6 border-b border-gray-200 text-center">
                    {credit.serviceId}
                  </td>
                  <td className="py-2 sm:py-4 px-1 sm:px-6 border-b border-gray-200 text-center">
                    {credit.total}
                  </td>
                  <td className="py-2 sm:py-4 px-1 sm:px-6 border-b border-gray-200 text-center">
                    {credit.used}
                  </td>
                  <td className="py-2 sm:py-4 px-1 sm:px-6 border-b border-gray-200 text-green-600 font-semibold text-center">
                    {credit.available}
                  </td>
                  <td className="py-2 sm:py-4 px-1 sm:px-6 border-b border-gray-200 text-center">
                    {credit.equivalent}
                  </td>
                  <td className="py-2 sm:py-4 px-1 sm:px-6 border-b border-gray-200 text-center">
                    {credit.isActive ? (
                      <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                        Inactive
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-4 sm:py-6 text-center text-gray-500 italic border-t border-gray-200"
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

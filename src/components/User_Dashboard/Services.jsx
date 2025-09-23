// its only for testing purpose

// import React from "react";
// import { db, auth } from "../../firebase_config/config";
// import { collection, doc, setDoc } from "firebase/firestore";

// const SeedCredits = () => {
//   const seedCredits = async () => {
//     try {
//       const user = auth.currentUser;
//       if (!user) {
//         alert("Please login first!");
//         return;
//       }

//       // Example credits for services
//       const creditsData = [
//         {
//           serviceId: "CL_SER_1",
//           total: 100,
//           used: 0,
//           available: 100,
//           equivalent: "100 pages",
//         },
//         {
//           serviceId: "CL_SER_2",
//           total: 50,
//           used: 0,
//           available: 50,
//           equivalent: "50 documents",
//         },
//       ];

//       // Store inside: Credits/{userId}/{creditId}
//       for (const credit of creditsData) {
//         const creditRef = doc(
//           collection(db, "Credits", user.uid, "UserCredits"),
//           credit.serviceId
//         );
//         await setDoc(creditRef, credit);
//       }

//       alert("Credits seeded successfully!");
//     } catch (err) {
//       console.error("Error seeding credits:", err);
//       alert("Error seeding credits. Check console.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <button
//         onClick={seedCredits}
//         className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
//       >
//         Seed Credits
//       </button>
//     </div>
//   );
// };

// export default SeedCredits;

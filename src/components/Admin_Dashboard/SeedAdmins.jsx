import React from "react";
import { db } from "../../firebase_config/config";
import { doc, setDoc } from "firebase/firestore";

const SeedAdmins = () => {
  const handleSeed = async () => {
    const admins = [
      {
        id: "admin1",
        name: "Tharun",
        phone: "+918555882595",
        email: "kirritharun@gmail.com",
      },
      {
        id: "admin2",
        name: "Content Manager",
        phone: "+918765432109",
        email: "admin2@site.com",
      },
      {
        id: "admin3",
        name: "Tech Lead",
        phone: "+917654321098",
        email: "admin3@site.com",
      },
      {
        id: "admin4",
        name: "Support Admin",
        phone: "+916543210987",
        email: "admin4@site.com",
      },
    ];

    try {
      for (let admin of admins) {
        await setDoc(doc(db, "Admins", admin.id), admin);
        console.log(`✅ Added ${admin.name}`);
      }
      alert("✅ Admins seeded successfully!");
    } catch (err) {
      console.error("❌ Error seeding admins:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <button
        onClick={handleSeed}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
      >
        Seed Admins
      </button>
    </div>
  );
};

export default SeedAdmins;

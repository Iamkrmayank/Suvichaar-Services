import { db } from "./firebase_config/config";
import { doc, setDoc } from "firebase/firestore";

const seedAdmins = async () => {
  const admins = [
    {
      id: "admin1",
      name: "Super Admin",
      phone: "+919876543210",
      email: "admin1@site.com",
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

  for (let admin of admins) {
    await setDoc(doc(db, "Admins", admin.id), admin);
    console.log(`✅ Added ${admin.name}`);
  }
};

seedAdmins()
  .then(() => console.log("All admins added successfully!"))
  .catch((err) => console.error("Error seeding admins:", err));

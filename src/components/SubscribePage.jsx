import React, { useState, useMemo, useEffect } from "react";
import { X, Search } from "lucide-react";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase_config/config";
import { onAuthStateChanged } from "firebase/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AuthDialog from './AuthDialog';
const colorClasses = {
  google: {
    bg: "bg-[#2c3e50]/10",
    text: "text-[#2c3e50]",
    border: "border-[#2c3e50]",
    btn: "bg-[#2c3e50] hover:bg-[#1f2d3a]",
  },
  whatsapp: {
    bg: "bg-[#0d9488]/10",
    text: "text-[#0d9488]",
    border: "border-[#0d9488]",
    btn: "bg-[#0d9488] hover:bg-[#0f766e]",
  },
  email: {
    bg: "bg-[#6b7280]/10",
    text: "text-[#374151]",
    border: "border-[#6b7280]",
    btn: "bg-[#6b7280] hover:bg-[#4b5563]",
  },
};

const SubscribePage = () => {

  const [activeButton, setActiveButton] = useState("google");
  const [categories, setCategories] = useState({});
  const [selectedTags, setSelectedTags] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authProvider, setAuthProvider] = useState(null);

  // 📱 Phone Dialog States
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [username, setUsername] = useState("User");

  const [showLoginDialog, setShowLoginDialog] = useState(false);


  // 🔐 Track logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);

        // 🧠 Try to get name from Firestore first
        const userDocRef = doc(db, "Users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.firstName || data.lastName) {
            setUsername(`${data.firstName || ""} ${data.lastName || ""}`.trim());
          } else if (user.displayName) {
            setUsername(user.displayName);
          } else {
            setUsername("User");
          }
        } else if (user.displayName) {
          setUsername(user.displayName);
        } else {
          setUsername("User");
        }

        if (user.providerData?.length > 0) {
          const providerId = user.providerData[0].providerId;
          if (providerId === "google.com") {
            setAuthProvider("google");
            setActiveButton("google");
          } else if (providerId === "password") {
            setAuthProvider("email");
            setActiveButton("email");
          } else {
            setAuthProvider(null);
            setActiveButton("google");
          }
        }
      } else {
        setUserId(null);
        setShowLoginDialog(true);
        setAuthProvider(null);
        setActiveButton("google");
      }
    });
    return () => unsubscribe();
  }, []);

  // 🧭 Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "Categories"));
        const fetched = {};
        querySnapshot.forEach((docSnap) => {
          fetched[docSnap.id] = docSnap.data().subcategories || [];
        });
        setCategories(fetched);
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // 📥 Fetch existing subscriptions
  useEffect(() => {
    const fetchUserSubscriptions = async () => {
      if (!userId || !activeButton) return;
      try {
        const subsCollection = collection(db, "Subscriptions", userId, activeButton);
        const subsSnap = await getDocs(subsCollection);
        const fetchedSubs = {};
        subsSnap.forEach((docSnap) => {
          fetchedSubs[docSnap.id] = docSnap.data().tags || [];
        });
        setSelectedTags(fetchedSubs);
      } catch (err) {
        console.error("❌ Error fetching user subscriptions:", err);
      }
    };
    fetchUserSubscriptions();
  }, [userId, activeButton]);

  // 🏷️ Toggle tag
  const handleTagToggle = (category, tag) => {
    setSelectedTags((prev) => {
      const updated = { ...prev };
      const current = updated[category] || [];
      if (current.includes(tag)) {
        updated[category] = current.filter((t) => t !== tag);
        if (updated[category].length === 0) delete updated[category];
      } else {
        updated[category] = [...current, tag];
      }
      return updated;
    });
  };

  // ✅ Confirm handler with phone check for WhatsApp
  const handleConfirm = async () => {
    if (!userId) return alert("⚠️ Please log in first!");
    if (!activeButton) return alert("⚠️ Please select a connection type.");

    // 🧩 If WhatsApp, check for phone number
    if (activeButton === "whatsapp") {
      const userDocRef = doc(db, "Users", userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists() || !userDoc.data().phoneNumber || !userDoc.data().countryCode) {
        setShowPhoneDialog(true);
        return; // wait for phone input
      }
    }

    await updateSubscriptionInFirestore();
  };

  // 🔄 Update Firestore Subscriptions
  const updateSubscriptionInFirestore = async () => {
    try {
      const subsRef = collection(db, "Subscriptions", userId, activeButton);
      const existingSnap = await getDocs(subsRef);
      const existingData = {};
      existingSnap.forEach((doc) => {
        existingData[doc.id] = doc.data().tags || [];
      });

      // 1️⃣ Add or update
      for (const [category, tags] of Object.entries(selectedTags)) {
        const docRef = doc(db, "Subscriptions", userId, activeButton, category);
        await setDoc(docRef, { tags, updatedAt: new Date().toISOString() });
      }

      // 2️⃣ Delete removed
      for (const category of Object.keys(existingData)) {
        if (!selectedTags[category]) {
          const docRef = doc(db, "Subscriptions", userId, activeButton, category);
          await deleteDoc(docRef);
        }
      }

      alert(`✅ Subscription updated successfully for ${activeButton.toUpperCase()}`);
    } catch (error) {
      console.error("❌ Error updating subscription:", error);
      alert("Failed to update subscriptions. Try again!");
    }
  };

  // 📱 Save phone number & continue
  const handleSavePhone = async () => {
    if (!phoneInput || !countryCode || !phoneNumber) {
      alert("⚠️ Please enter a valid phone number");
      return;
    }
    try {
      await setDoc(
        doc(db, "Users", userId),
        { countryCode, phoneNumber },
        { merge: true }
      );
      setShowPhoneDialog(false);
      alert("✅ Phone number saved!");
      await updateSubscriptionInFirestore();
    } catch (err) {
      console.error("❌ Error saving phone number:", err);
    }
  };

  const handleConnectClick = (type) => {
    setActiveButton(type);
    setSelectedTags({});
  };

  const handleSelectAll = () => {
    const all = {};
    Object.entries(categories).forEach(([cat, tags]) => (all[cat] = [...tags]));
    setSelectedTags(all);
  };
  const handleDeselectAll = () => setSelectedTags({});
  const handleSelectAllCategory = (category) =>
    setSelectedTags((prev) => ({ ...prev, [category]: [...categories[category]] }));
  const handleDeselectAllCategory = (category) =>
    setSelectedTags((prev) => {
      const updated = { ...prev };
      delete updated[category];
      return updated;
    });

  // 🔍 Search filter
  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categories;
    const filtered = {};
    Object.entries(categories).forEach(([cat, tags]) => {
      const matched = tags.filter((t) =>
        t.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matched.length > 0) filtered[cat] = matched;
    });
    return filtered;
  }, [searchTerm, categories]);

  const selectedTagsFlat = useMemo(() => {
    return Object.entries(selectedTags).flatMap(([cat, tags]) =>
      tags.map((t) => ({ category: cat, tag: t }))
    );
  }, [selectedTags]);

  const baseProviders = [
    { type: "google", label: "Google", icon: "/icons8-google2.svg" },
    { type: "email", label: "Email", icon: "/icons8-gmail2.svg" },
    { type: "whatsapp", label: "WhatsApp", icon: "/icons8-whatsapp.svg" },
  ];

  const providers = useMemo(() => {
    if (authProvider === "google") {
      return baseProviders.filter((p) => p.type !== "email");
    }
    if (authProvider === "email") {
      return baseProviders.filter((p) => p.type !== "google");
    }
    return baseProviders;
  }, [authProvider]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-gray-100 font-inter px-4 sm:px-6 py-6">
      {/* Left Panel */}
      <div className="w-full lg:w-1/3 p-6 sm:p-8 bg-white shadow-md rounded-2xl m-2 sm:m-4 flex flex-col items-center space-y-5 justify-center">
        <img
          className="mb-0 scale-75"
          src="https://cdn.suvichaar.org/media/designasset/brandasset/logo/suvichaarblacklogoprimaryhori.png"
          alt=""
        />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center lg:text-left">
          Hello, {username}
        </h2>
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center ">
          Connect with Suvichaar for Daily Reading, Learning, Updates, Information & Inspiration
        </h1>

        <div className="w-full flex flex-col space-y-3">
          {providers.map(({ type, label, icon }) => (
            <button
              key={type}
              onClick={() => handleConnectClick(type)}
              className={`w-full flex items-center justify-center sm:justify-start gap-3 px-5 py-3 rounded-xl font-medium shadow-md border transform transition-transform duration-200 hover:scale-105 active:scale-95 ${activeButton === type
                ? `${colorClasses[type].btn} text-white`
                : "bg-white hover:bg-gray-100 text-gray-800 border-gray-200"
                }`}
            >
              <img src={icon} alt={label} className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-sm sm:text-base">Connect with {label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      {activeButton && (
        <div className="w-full lg:w-2/3 p-4 sm:p-8 flex flex-col">
          {loading ? (
            <div className="text-center text-gray-600 text-lg mt-10">
              ⏳ Loading categories from Firestore...
            </div>
          ) : (
            <>
              {/* Search & Confirm */}
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
                <div className="relative w-full sm:w-1/2">
                  <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search your interests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-sm sm:text-base"
                  />
                </div>
                <button
                  onClick={handleConfirm}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition text-white text-sm sm:text-lg ${colorClasses[activeButton].btn}`}
                >
                  Confirm Subscription
                </button>
              </div>

              {/* Select/Deselect All */}
              <div className="flex flex-wrap justify-start gap-3 mb-6 text-sm sm:text-base">
                <button
                  onClick={handleSelectAll}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Select All
                </button>
                <button
                  onClick={handleDeselectAll}
                  className="font-medium text-gray-500 hover:underline"
                >
                  Deselect All
                </button>
              </div>



              {/* Category Sections */}
              <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-1 sm:pr-4">
                {/* Selected Tags on Top */}
                {selectedTagsFlat.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedTagsFlat.map(({ category, tag }) => (
                      <div
                        key={`${category}-${tag}`}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs sm:text-sm cursor-pointer ${colorClasses[activeButton].bg} ${colorClasses[activeButton].text} ${colorClasses[activeButton].border}`}
                        onClick={() => handleTagToggle(category, tag)}
                      >
                        {tag}
                        <X
                          className={`w-4 h-4 ${colorClasses[activeButton].text}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {Object.entries(filteredCategories).map(([category, tags]) => (
                  <div
                    key={category}
                    className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200 hover:shadow-md transition"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
                      <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                        {category}
                      </h4>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleSelectAllCategory(category)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Select All
                        </button>
                        <button
                          onClick={() => handleDeselectAllCategory(category)}
                          className="text-xs text-gray-500 hover:underline"
                        >
                          Deselect
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => {
                        const selected = selectedTags[category]?.includes(tag);
                        return (
                          <div
                            key={`${category}-${tag}`}
                            onClick={() => handleTagToggle(category, tag)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs sm:text-sm cursor-pointer transition ${selected
                              ? `${colorClasses[activeButton].bg} ${colorClasses[activeButton].text} ${colorClasses[activeButton].border} scale-105`
                              : "bg-white hover:bg-gray-100 text-gray-700 border-gray-200"
                              }`}
                          >
                            {tag}
                            {selected && (
                              <X
                                className={`w-4 h-4 ${colorClasses[activeButton].text}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTagToggle(category, tag);
                                }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* 📱 Phone Input Dialog */}
      {showPhoneDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] sm:w-[400px]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Enter your WhatsApp Number
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              Please provide your phone number with country code.
            </p>

            <PhoneInput
              country={"in"}
              value={phoneInput}
              onChange={(value, data) => {
                setPhoneInput(value);
                setCountryCode("+" + data.dialCode);
                setPhoneNumber(value.replace(data.dialCode, ""));
              }}
              inputStyle={{
                width: "100%",
                height: "45px",
                fontSize: "16px",
              }}
              containerStyle={{ marginBottom: "16px" }}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPhoneDialog(false)}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePhone}
                className="px-4 py-2 rounded-lg text-white bg-emerald-600 hover:bg-emerald-700"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* {showLoginDialog && (
        <LoginDialog
          open={showLoginDialog}
          onClose={() => setShowLoginDialog(false)}
          onSuccess={(userData) => {
            setUserId(userData.uid);
            setShowLoginDialog(false);
          }}
        />
      )} */}
      <AuthDialog
        open={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onSuccess={(userData) => {
          setUserId(userData.uid);
          setShowLoginDialog(false);
        }}
      />


    </div>
  );
};

export default SubscribePage;

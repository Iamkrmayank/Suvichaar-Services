
// import React, { useState, useEffect } from "react";
// import { Upload } from "lucide-react";
// import { auth, db } from "../../../firebase_config/config";
// import { getDoc, doc } from "firebase/firestore";
// import { signOut } from "firebase/auth";

// function OcrAdvance() {
//   const [file, setFile] = useState(null);
//   const [userDetails, setUserDetails] = useState(null);
//   const [creditStatus, setCreditStatus] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [processing, setProcessing] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [creditsUsed, setCreditsUsed] = useState(null);

//   const serviceId = "CL_SER_1";
//   const cloudFunctionUrl =
//     "https://us-central1-content-labs-8b84e.cloudfunctions.net/processAdvanceOcr";
//   // 🔐 Check user + credits on mount
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (!user) {
//         setUserDetails(null);
//         setCreditStatus(null);
//         setLoading(false);
//         return;
//       }

//       try {
//         setUserDetails(user);
//         const creditRef = doc(db, "Credits", user.uid, "UserCredits", serviceId);
//         const creditSnap = await getDoc(creditRef);

//         if (creditSnap.exists()) {
//           setCreditStatus(creditSnap.data());
//         } else {
//           setCreditStatus(null);
//         }
//       } catch (err) {
//         console.error("Error fetching credits:", err);
//         setCreditStatus(null);
//       } finally {
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await signOut(auth);
//     setUserDetails(null);
//   };

//   const handleFileChange = (e) => {
//     if (!processing) setFile(e.target.files[0]);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     if (!processing) setFile(e.dataTransfer.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file || !userDetails) return;
//     setProcessing(true);
//     setProgress(0);
//     setCreditsUsed(null);

//     // Fake progress until completion
//     let timePassed = 0;
//     const interval = setInterval(() => {
//       timePassed += 1;
//       setProgress((prev) => {
//         const next = prev + Math.floor(Math.random() * 5 + 2);
//         return next > 95 ? 95 : next;
//       });
//       if (timePassed >= 20) clearInterval(interval);
//     }, 1000);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       // 🔒 Firebase ID token
//       const idToken = await userDetails.getIdToken();

//       const response = await fetch(cloudFunctionUrl, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${idToken}`,
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to process file");
//       }

//       // ✅ Read credits header
//       console.log("Response headers:");
//       for (let [key, value] of response.headers.entries()) {
//         console.log(`${key}: ${value}`);
//       }
//       const credits = response.headers.get("X-Credits-Used");
//       if (credits) {
//         setCreditsUsed(credits);
//         console.log("Credits Used:", credits);
//       }

//       // ✅ Download processed DOCX
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = file.name.replace(".pdf", ".docx");
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);

//       setProgress(100);
//     } catch (error) {
//       console.error("Upload failed:", error);
//       alert("Something went wrong while processing your file.");
//     } finally {
//       setTimeout(() => {
//         setProcessing(false);
//         setProgress(0);
//       }, 1500);
//     }
//   };

//   // ✅ Progress Bar Component
//   const ProgressBar = () => (
//     <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
//       <div
//         className="bg-[#E6A24B] h-3 transition-all duration-300 ease-in-out"
//         style={{ width: `${progress}%` }}
//       />
//     </div>
//   );

//   // ✅ Conditional UI based on credits
//   const renderContent = () => {
//     if (loading) {
//       return <p className="text-center text-gray-600">Loading service status...</p>;
//     }

//     if (!creditStatus) {
//       return (
//         <p className="text-center text-red-600 font-semibold">
//           Service not found for your account. Please contact support@example.com
//         </p>
//       );
//     }

//     if (!creditStatus.isActive) {
//       return (
//         <p className="text-center text-red-600 font-semibold">
//           This service is <span className="underline">inactive</span> for your account.
//           <br />
//           Please contact support@example.com
//         </p>
//       );
//     }

//     if (creditStatus.available <= 0) {
//       return (
//         <p className="text-center text-red-600 font-semibold">
//           Your credits for this tool are <span className="underline">completed</span>.
//           <br />
//           Please contact support@example.com
//         </p>
//       );
//     }

//     // ✅ Normal uploader
//     return (
//       <>
//         <div
//           onDrop={processing ? undefined : handleDrop}
//           onDragOver={(e) => !processing && e.preventDefault()}
//           className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition ${
//             processing
//               ? "border-gray-300 bg-gray-100 cursor-not-allowed opacity-70"
//               : "border-[#B7D4E9] hover:border-[#E6A24B] cursor-pointer"
//           }`}
//         >
//           <Upload className="w-12 h-12 text-[#B7D4E9] mb-3" />
//           <p className="text-gray-700">Drag and drop file here</p>
//           <p className="text-sm text-gray-500">Limit 50MB per file • PDF</p>

//           <label
//             className={`mt-5 px-5 py-2 rounded-lg text-sm font-semibold text-white ${
//               processing
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-[#E6A24B] hover:bg-[#d68d32] cursor-pointer"
//             }`}
//           >
//             {processing ? "Disabled" : "Browse files"}
//             <input
//               type="file"
//               accept="application/pdf"
//               className="hidden"
//               onChange={handleFileChange}
//               disabled={processing}
//             />
//           </label>
//         </div>

//         {file && (
//           <div className="mt-4 text-sm text-gray-700">
//             <span className="font-semibold">Selected file:</span> {file.name}
//           </div>
//         )}

//         <button
//           onClick={handleUpload}
//           disabled={!file || processing}
//           className={`w-full mt-6 px-4 py-3 rounded-lg font-semibold transition ${
//             file && !processing
//               ? "bg-[#E6A24B] text-white hover:bg-[#d68d32]"
//               : "bg-gray-300 text-gray-500 cursor-not-allowed"
//           }`}
//         >
//           {processing ? "Processing..." : file ? "Upload PDF to begin" : "Upload a PDF to begin"}
//         </button>

//         {/* Progress */}
//         {processing && <ProgressBar />}

//         <div className="mt-6 text-xs text-gray-500">
//           {/* • You currently have <b>{creditStatus.available}</b> credits remaining. */}
//           {/* <br /> */}
//           • Each extracted page deducts 1 credit from your balance.
//         </div>

//         {/* ✅ Show credits used */}
//         {creditsUsed && (
//           <div className="mt-4 text-green-600 text-sm font-semibold">
//             ✅File Successfully Downloaded, Service Deducted <b>{creditsUsed}</b> credits
//           </div>
//         )}
//       </>
//     );
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#B7D4E9] via-white to-[#E6A24B] text-black p-6 relative">
//       {/* ✅ Top-right Profile/Login Section */}
//       <div className="absolute top-5 right-5">
//         {/* Add your profile/logout button here */}
//       </div>

//       {/* ✅ Main Card */}
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border border-[#B7D4E9]">
//         <h1 className="text-2xl font-bold mb-6 text-center text-[#E6A24B]">
//           PDF → DOCX with Content LABS Intelligence
//         </h1>

//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// export default OcrAdvance;



// import React, { useState, useEffect } from "react";
// import { Upload } from "lucide-react";
// import { auth, db } from "../../../firebase_config/config";
// import { getDoc, doc } from "firebase/firestore";
// import { signOut } from "firebase/auth";

// function OcrAdvance() {
//   const [file, setFile] = useState(null);
//   const [userDetails, setUserDetails] = useState(null);
//   const [creditStatus, setCreditStatus] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [processing, setProcessing] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [creditsUsed, setCreditsUsed] = useState(null);

//   const serviceId = "CL_SER_2";
//   const cloudFunctionUrl =
//     "https://us-central1-content-labs-8b84e.cloudfunctions.net/processAdvanceOcr";
//   // 🔐 Check user + credits on mount
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (!user) {
//         setUserDetails(null);
//         setCreditStatus(null);
//         setLoading(false);
//         return;
//       }

//       try {
//         setUserDetails(user);
//         const creditRef = doc(db, "Credits", user.uid, "UserCredits", serviceId);
//         const creditSnap = await getDoc(creditRef);

//         if (creditSnap.exists()) {
//           setCreditStatus(creditSnap.data());
//         } else {
//           setCreditStatus(null);
//         }
//       } catch (err) {
//         console.error("Error fetching credits:", err);
//         setCreditStatus(null);
//       } finally {
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await signOut(auth);
//     setUserDetails(null);
//   };

//   const handleFileChange = (e) => {
//     if (!processing) setFile(e.target.files[0]);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     if (!processing) setFile(e.dataTransfer.files[0]);
//   };

//   // const handleUpload = async () => {
//   //   if (!file || !userDetails) return;
//   //   setProcessing(true);
//   //   setProgress(0);
//   //   setCreditsUsed(null);

//   //   // Fake progress until completion
//   //   let timePassed = 0;
//   //   const interval = setInterval(() => {
//   //     timePassed += 1;
//   //     setProgress((prev) => {
//   //       const next = prev + Math.floor(Math.random() * 5 + 2);
//   //       return next > 95 ? 95 : next;
//   //     });
//   //     if (timePassed >= 20) clearInterval(interval);
//   //   }, 1000);

//   //   try {
//   //     const formData = new FormData();
//   //     formData.append("file", file);

//   //     // 🔒 Firebase ID token
//   //     const idToken = await userDetails.getIdToken();

//   //     const response = await fetch(cloudFunctionUrl, {
//   //       method: "POST",
//   //       headers: {
//   //         Authorization: `Bearer ${idToken}`,
//   //       },
//   //       body: formData,
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error("Failed to process file");
//   //     }

//   //     // ✅ Read credits header
//   //     console.log("Response headers:");
//   //     for (let [key, value] of response.headers.entries()) {
//   //       console.log(`${key}: ${value}`);
//   //     }
//   //     const credits = response.headers.get("X-Credits-Used");
//   //     if (credits) {
//   //       setCreditsUsed(credits);
//   //       console.log("Credits Used:", credits);
//   //     }

//   //     // ✅ Download processed DOCX
//   //     const blob = await response.blob();
//   //     const url = window.URL.createObjectURL(blob);
//   //     const a = document.createElement("a");
//   //     a.href = url;
//   //     a.download = file.name.replace(".pdf", ".docx");
//   //     document.body.appendChild(a);
//   //     a.click();
//   //     a.remove();
//   //     window.URL.revokeObjectURL(url);

//   //     setProgress(100);
//   //   } catch (error) {
//   //     console.error("Upload failed:", error);
//   //     alert("Something went wrong while processing your file.");
//   //   } finally {
//   //     setTimeout(() => {
//   //       setProcessing(false);
//   //       setProgress(0);
//   //     }, 1500);
//   //   }
//   // };

//   // ✅ Progress Bar Component


//   const handleUpload = async () => {
//     if (!file || !userDetails) return;
//     setProcessing(true);
//     setProgress(0);
//     setCreditsUsed(null);

//     // Fake progress until completion
//     let timePassed = 0;
//     const interval = setInterval(() => {
//       timePassed += 1;
//       setProgress((prev) => {
//         const next = prev + Math.floor(Math.random() * 5 + 2);
//         return next > 95 ? 95 : next;
//       });
//       if (timePassed >= 20) clearInterval(interval);
//     }, 1000);

//     try {
//       // 🔑 Convert file → ArrayBuffer → Uint8Array
//       const fileBuffer = await file.arrayBuffer();
//       const pdfBytes = new Uint8Array(fileBuffer);

//       // 🔒 Firebase ID token
//       const idToken = await userDetails.getIdToken();

//       const response = await fetch(cloudFunctionUrl, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${idToken}`,
//           "Content-Type": "application/pdf", // 👈 raw bytes, not multipart
//         },
//         body: pdfBytes, // 👈 send raw PDF
//       });

//       if (!response.ok) {
//         throw new Error("Failed to process file");
//       }

//       // ✅ Read credits header
//       // console.log("Response headers:");
//       // for (let [key, value] of response.headers.entries()) {
//         // console.log(`${key}: ${value}`);
//       // }
//       const credits = response.headers.get("X-Credits-Used");
//       if (credits) {
//         setCreditsUsed(credits);
//         // console.log("Credits Used:", credits);
//       }

//       // ✅ Download processed DOCX
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = file.name.replace(".pdf", ".docx");
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);

//       setProgress(100);
//     } catch (error) {
//       console.error("Upload failed:", error);
//       alert("Something went wrong while processing your file.");
//     } finally {
//       setTimeout(() => {
//         setProcessing(false);
//         setProgress(0);
//       }, 1500);
//     }
//   };


//   const ProgressBar = () => (
//     <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
//       <div
//         className="bg-[#E6A24B] h-3 transition-all duration-300 ease-in-out"
//         style={{ width: `${progress}%` }}
//       />
//     </div>
//   );

//   // ✅ Conditional UI based on credits
//   const renderContent = () => {
//     if (loading) {
//       return <p className="text-center text-gray-600">Loading service status...</p>;
//     }

//     if (!creditStatus) {
//       return (
//         <p className="text-center text-red-600 font-semibold">
//           Service not found for your account. Please contact support@example.com
//         </p>
//       );
//     }

//     if (!creditStatus.isActive) {
//       return (
//         <p className="text-center text-red-600 font-semibold">
//           This service is <span className="underline">inactive</span> for your account.
//           <br />
//           Please contact support@example.com
//         </p>
//       );
//     }

//     if (creditStatus.available <= 0) {
//       return (
//         <p className="text-center text-red-600 font-semibold">
//           Your credits for this tool are <span className="underline">completed</span>.
//           <br />
//           Please contact support@example.com
//         </p>
//       );
//     }

//     // ✅ Normal uploader
//     return (
//       <>
//         <div
//           onDrop={processing ? undefined : handleDrop}
//           onDragOver={(e) => !processing && e.preventDefault()}
//           className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition ${processing
//               ? "border-gray-300 bg-gray-100 cursor-not-allowed opacity-70"
//               : "border-[#B7D4E9] hover:border-[#E6A24B] cursor-pointer"
//             }`}
//         >
//           <Upload className="w-12 h-12 text-[#B7D4E9] mb-3" />
//           <p className="text-gray-700">Drag and drop file here</p>
//           <p className="text-sm text-gray-500">Limit 25MB per file • PDF</p>

//           <label
//             className={`mt-5 px-5 py-2 rounded-lg text-sm font-semibold text-white ${processing
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-[#E6A24B] hover:bg-[#d68d32] cursor-pointer"
//               }`}
//           >
//             {processing ? "Disabled" : "Browse files"}
//             <input
//               type="file"
//               accept="application/pdf"
//               className="hidden"
//               onChange={handleFileChange}
//               disabled={processing}
//             />
//           </label>
//         </div>

//         {file && (
//           <div className="mt-4 text-sm text-gray-700">
//             <span className="font-semibold">Selected file:</span> {file.name}
//           </div>
//         )}

//         <button
//           onClick={handleUpload}
//           disabled={!file || processing}
//           className={`w-full mt-6 px-4 py-3 rounded-lg font-semibold transition ${file && !processing
//               ? "bg-[#E6A24B] text-white hover:bg-[#d68d32]"
//               : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//         >
//           {processing ? "Processing..." : file ? "Upload PDF to begin" : "Upload a PDF to begin"}
//         </button>

//         {/* Progress */}
//         {processing && <ProgressBar />}

//         <div className="mt-6 text-xs text-gray-500">
//           {/* • You currently have <b>{creditStatus.available}</b> credits remaining. */}
//           {/* <br /> */}
//           • Each extracted page deducts 1 credit from your balance.
//         </div>

//         {/* ✅ Show credits used */}
//         {creditsUsed && (
//           <div className="mt-4 text-green-600 text-sm font-semibold">
//             ✅File Successfully Downloaded, Service Deducted <b>{creditsUsed}</b> credits
//           </div>
//         )}
//       </>
//     );
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#B7D4E9] via-white to-[#E6A24B] text-black p-6 relative">
//       {/* ✅ Top-right Profile/Login Section */}
//       <div className="absolute top-5 right-5">
//         {/* Add your profile/logout button here */}
//       </div>

//       {/* ✅ Main Card */}
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border border-[#B7D4E9]">
//         <h1 className="text-2xl font-bold mb-2 text-center text-[#E6A24B]">
//           OCR Advance
//         </h1>
//         <p className="text-center text-gray-600 mb-6">
//           High-precision OCR that handles complex layouts, tables, multi-language documents, and low-quality scans. Provides enterprise-grade recognition for detailed document processing.
//         </p>

//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// export default OcrAdvance;


import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { auth, db } from "../../../firebase_config/config";
import { getDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";

function OcrAdvance() {
  const [file, setFile] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [creditStatus, setCreditStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [creditsUsed, setCreditsUsed] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // ✅ Added for persistent success msg

  const serviceId = "CL_SER_2";
  const cloudFunctionUrl =
    "https://us-central1-content-labs-8b84e.cloudfunctions.net/processAdvanceOcr";

  // 🔐 Check user + credits on mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUserDetails(null);
        setCreditStatus(null);
        setLoading(false);
        return;
      }

      try {
        setUserDetails(user);
        const creditRef = doc(db, "Credits", user.uid, "UserCredits", serviceId);
        const creditSnap = await getDoc(creditRef);

        if (creditSnap.exists()) {
          setCreditStatus(creditSnap.data());
        } else {
          setCreditStatus(null);
        }
      } catch (err) {
        console.error("Error fetching credits:", err);
        setCreditStatus(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUserDetails(null);
  };

  const handleFileChange = (e) => {
    if (!processing) setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!processing) setFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !userDetails) return;
    if (!creditStatus || creditStatus.available <= 0) {
      setErrorMessage("❌ Not enough credits to process this file.");
      return;
    }

    setProcessing(true);
    setProgress(0);
    setCreditsUsed(null);
    setErrorMessage(null);

    // Fake progress until completion
    let timePassed = 0;
    const interval = setInterval(() => {
      timePassed += 1;
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 5 + 2);
        return next > 95 ? 95 : next;
      });
      if (timePassed >= 20) clearInterval(interval);
    }, 1000);

    try {
      // 🔑 Convert file → ArrayBuffer → Uint8Array
      const fileBuffer = await file.arrayBuffer();
      const pdfBytes = new Uint8Array(fileBuffer);

      // 🔒 Firebase ID token
      const idToken = await userDetails.getIdToken();

      const response = await fetch(cloudFunctionUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/pdf", // 👈 raw bytes, not multipart
        },
        body: pdfBytes, // 👈 send raw PDF
      });

      if (!response.ok) {
        throw new Error("Failed to process file");
      }

      // ✅ Read credits header
      console.log("Response headers:");
      for (let [key, value] of response.headers.entries()) {
        console.log(`${key}: ${value}`);
      }
      const credits = response.headers.get("X-Credits-Used");
      if (credits) {
        setCreditsUsed(credits);
        console.log("Credits Used:", credits);
      }

      // ✅ Download processed DOCX
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(".pdf", ".docx");
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setProgress(100);

      setSuccessMessage(`✅ File Successfully Downloaded, Service Used ${creditsUsed} credits`);
      setTimeout(() => setSuccessMessage(""), 8000);

      try {
        const creditRef = doc(db, "Credits", userDetails.uid, "UserCredits", serviceId);
        const creditSnap = await getDoc(creditRef);
        if (creditSnap.exists()) {
          setCreditStatus(creditSnap.data());
        } else {
          setCreditStatus(null);
        }
      } catch (err) {
        console.error("Error refreshing credits:", err);
      }

      // 🧹 Reset file so user must re-upload
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      setErrorMessage("Something went wrong while processing your file.");
    } finally {
      setTimeout(() => {
        setProcessing(false);
        setProgress(0);
      }, 1500);
    }
  };

  const ProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
      <div
        className="bg-[#E6A24B] h-3 transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  // ✅ Conditional UI based on credits
  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-600">Loading service status...</p>;
    }

    if (!creditStatus) {
      return (
        <p className="text-center text-red-600 font-semibold">
          Service not found for your account. Please contact support@example.com
        </p>
      );
    }

    if (!creditStatus.isActive) {
      return (
        <p className="text-center text-red-600 font-semibold">
          This service is <span className="underline">inactive</span> for your account.
          <br />
          Please contact support@example.com
        </p>
      );
    }

    if (creditStatus.available <= 0) {
      return (
        <p className="text-center text-red-600 font-semibold">
          Your credits for this tool are <span className="underline">completed</span>.
          <br />
          Please contact support@example.com
        </p>
      );
    }

    // ✅ Normal uploader
    return (
      <>
        <div
          onDrop={processing ? undefined : handleDrop}
          onDragOver={(e) => !processing && e.preventDefault()}
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition ${processing
            ? "border-gray-300 bg-gray-100 cursor-not-allowed opacity-70"
            : "border-[#B7D4E9] hover:border-[#E6A24B] cursor-pointer"
            }`}
        >
          <Upload className="w-12 h-12 text-[#B7D4E9] mb-3" />
          <p className="text-gray-700">Drag and drop file here</p>
          <p className="text-sm text-gray-500">Limit 25MB per file • PDF</p>

          <label
            className={`mt-5 px-5 py-2 rounded-lg text-sm font-semibold text-white ${processing
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#E6A24B] hover:bg-[#d68d32] cursor-pointer"
              }`}
          >
            {processing ? "Disabled" : "Browse files"}
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
              disabled={processing}
            />
          </label>
        </div>

        {file && (
          <div className="mt-4 text-sm text-gray-700">
            <span className="font-semibold">Selected file:</span> {file.name}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || processing}
          className={`w-full mt-6 px-4 py-3 rounded-lg font-semibold transition ${file && !processing
            ? "bg-[#E6A24B] text-white hover:bg-[#d68d32]"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {processing ? "Processing..." : file ? "Upload PDF to begin" : "Upload a PDF to begin"}
        </button>

        {/* Progress */}
        {processing && <ProgressBar />}

        <div className="mt-6 text-xs text-gray-500">
          • Each extracted page deducts 1 credit from your balance.
        </div>

        {/* ✅ Show error/success messages */}
        {errorMessage && (
          <div className="mt-4 text-red-600 text-sm font-semibold">{errorMessage}</div>
        )}
        {creditsUsed && (
          <div className="mt-4 text-green-600 text-sm font-semibold">
            ✅ File Successfully Downloaded, Service Deducted <b>{creditsUsed}</b> credits
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#B7D4E9] via-white to-[#E6A24B] text-black p-6 relative">
      {/* ✅ Top-right Profile/Login Section */}
      <div className="absolute top-5 right-5"></div>

      {/* ✅ Main Card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border border-[#B7D4E9]">
        <h1 className="text-2xl font-bold mb-2 text-center text-[#E6A24B]">
          OCR Advance
        </h1>
        <p className="text-center text-gray-600 mb-6">
          High-precision OCR that handles complex layouts, tables, multi-language documents, and low-quality scans. Provides enterprise-grade recognition for detailed document processing.
        </p>

        {renderContent()}
      </div>
    </div>
  );
}

export default OcrAdvance;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Upload } from "lucide-react";
import { auth, db } from "../../../firebase_config/config";
import { getDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";

const serviceId = "CL_SER_2";
const cloudFunctionUrl =
  "https://us-central1-content-labs-8b84e.cloudfunctions.net/processAdvanceOcr";

// Helper for file processing
const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

// ------------------------------------
// UI Components
// ------------------------------------
const UploaderBox = ({ onDrop, onDragOver, processing, onFileChange }) => (
  <div
    onDrop={onDrop}
    onDragOver={onDragOver}
    className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition ${
      processing
        ? "border-gray-300 bg-gray-100 cursor-not-allowed opacity-70"
        : "border-[#B7D4E9] hover:border-[#E6A24B] cursor-pointer"
    }`}
  >
    <Upload className="w-12 h-12 text-[#B7D4E9] mb-3" />
    <p className="text-gray-700">Drag and drop file here</p>
    <p className="text-sm text-gray-500">Limit 25MB per file • PDF</p>

    <label
      className={`mt-5 px-5 py-2 rounded-lg text-sm font-semibold text-white ${
        processing
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-[#E6A24B] hover:bg-[#d68d32] cursor-pointer"
      }`}
    >
      {processing ? "Disabled" : "Browse files"}
      <input
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={onFileChange}
        disabled={processing}
      />
    </label>
  </div>
);

const ProgressBar = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
    <div
      className="bg-[#E6A24B] h-3 transition-all duration-300 ease-in-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);

// ------------------------------------
// Main Component
// ------------------------------------
function OcrAdvance() {
  const [userDetails, setUserDetails] = useState(null);
  const [creditStatus, setCreditStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const [file, setFile] = useState(null);
  const [uploadState, setUploadState] = useState({
    processing: false,
    progress: 0,
    message: null,
    messageType: null, // "success" or "error"
    creditsUsed: null,
  });

  const { processing, progress, message, messageType, creditsUsed } = uploadState;

  // 🔐 Check user + credits on mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUserDetails(null);
        setCreditStatus(null);
        setLoading(false);
        return;
      }
      setUserDetails(user);
      try {
        const creditRef = doc(db, "Credits", user.uid, "UserCredits", serviceId);
        const creditSnap = await getDoc(creditRef);
        setCreditStatus(creditSnap.exists() ? creditSnap.data() : null);
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
    setCreditStatus(null);
  };

  const handleFileChange = useCallback(
    (e) => {
      if (processing) return;
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
        setUploadState((prev) => ({ ...prev, message: null, messageType: null }));
      }
    },
    [processing]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      if (processing) return;
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile) {
        setFile(selectedFile);
        setUploadState((prev) => ({ ...prev, message: null, messageType: null }));
      }
    },
    [processing]
  );

  const handleUpload = useCallback(async () => {
    if (!file || !userDetails || processing) return;

    if (!creditStatus || creditStatus.available <= 0) {
      setUploadState((prev) => ({
        ...prev,
        message: "❌ Not enough credits to process this file.",
        messageType: "error",
      }));
      return;
    }

    setUploadState((prev) => ({
      ...prev,
      processing: true,
      progress: 0,
      message: null,
      messageType: null,
      creditsUsed: null,
    }));

    const interval = setInterval(() => {
      setUploadState((prev) => ({
        ...prev,
        progress: Math.min(prev.progress + Math.floor(Math.random() * 5 + 2), 95),
      }));
    }, 1000);

    try {
      const pdfBytes = new Uint8Array(await readFileAsArrayBuffer(file));
      const idToken = await userDetails.getIdToken();

      const response = await fetch(cloudFunctionUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/pdf",
        },
        body: pdfBytes,
      });

      if (!response.ok) {
        throw new Error("Failed to process file");
      }

      const creditsHeader = response.headers.get("X-Credits-Used");
      const creditsUsedValue = creditsHeader ? parseInt(creditsHeader, 10) : 1;

      // Update UI and credit status after successful operation
      setUploadState((prev) => ({
        ...prev,
        progress: 100,
        creditsUsed: creditsUsedValue,
        message: `✅ File successfully downloaded. Service deducted ${creditsUsedValue} credits.`,
        messageType: "success",
      }));

      // Update credit status locally to avoid extra firebase call
      setCreditStatus((prev) => ({
        ...prev,
        available: prev.available - creditsUsedValue,
      }));

      // Initiate file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(".pdf", ".docx");
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadState((prev) => ({
        ...prev,
        message: "❌ Something went wrong while processing your file.",
        messageType: "error",
      }));
    } finally {
      clearInterval(interval);
      setTimeout(() => {
        setUploadState((prev) => ({ ...prev, processing: false, progress: 0 }));
        setFile(null);
      }, 1500);
    }
  }, [file, userDetails, processing, creditStatus]);

  const renderContent = useMemo(() => {
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

    return (
      <>
        <UploaderBox
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          processing={processing}
          onFileChange={handleFileChange}
        />
        {file && (
          <div className="mt-4 text-sm text-gray-700">
            <span className="font-semibold">Selected file:</span> {file.name}
          </div>
        )}
        <button
          onClick={handleUpload}
          disabled={!file || processing}
          className={`w-full mt-6 px-4 py-3 rounded-lg font-semibold transition ${
            file && !processing
              ? "bg-[#E6A24B] text-white hover:bg-[#d68d32]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {processing ? "Processing..." : file ? "Upload PDF to begin" : "Upload a PDF to begin"}
        </button>
        {processing && <ProgressBar progress={progress} />}
        <div className="mt-6 text-xs text-gray-500">
          • Each extracted page deducts 1 credit from your balance.
        </div>
        {message && (
          <div
            className={`mt-4 text-sm font-semibold ${
              messageType === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}
      </>
    );
  }, [
    loading,
    creditStatus,
    processing,
    file,
    progress,
    message,
    messageType,
    handleDrop,
    handleFileChange,
    handleUpload,
  ]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#B7D4E9] via-white to-[#E6A24B] text-black p-6 relative">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border border-[#B7D4E9]">
        <h1 className="text-2xl font-bold mb-2 text-center text-[#E6A24B]">OCR Advance</h1>
        <p className="text-center text-gray-600 mb-6">
          High-precision OCR that handles complex layouts, tables, multi-language documents, and
          low-quality scans. Provides enterprise-grade recognition for detailed document processing.
        </p>
        {renderContent}
      </div>
    </div>
  );
}

export default OcrAdvance;
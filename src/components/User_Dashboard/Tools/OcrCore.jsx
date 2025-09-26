
import React, { useState, useEffect, useCallback } from "react";
import { Upload } from "lucide-react";
import { auth, db } from "../../../firebase_config/config";
import { getDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";

const serviceId = "CL_SER_1";
const cloudFunctionUrl =
  "https://us-central1-content-labs-8b84e.cloudfunctions.net/processOcrCore";

// ------------------------------------
// Helper
// ------------------------------------
const readFileAsArrayBuffer = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });

// ------------------------------------
// Uploader Component
// ------------------------------------
const Uploader = ({
  file,
  setFile,
  processing,
  setProcessing,
  setProgress,
  setErrorMessage,
  setSuccessMessage,
  userDetails,
  creditStatus,
  setCreditStatus,
}) => {
  const [phase, setPhase] = useState("idle"); // idle | uploading | analysing

  const handleDrop = (e) => {
    e.preventDefault();
    if (processing) return;
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile) handleFileSelection(selectedFile);
  };

  const handleFileChange = (e) => {
    if (processing) return;
    const selectedFile = e.target.files[0];
    if (selectedFile) handleFileSelection(selectedFile);
  };

  const handleFileSelection = useCallback(
    async (selectedFile) => {
      if (selectedFile.type !== "application/pdf") {
        setErrorMessage("❌ Only PDF files are supported.");
        return;
      }

      if (selectedFile.size > 25 * 1024 * 1024) {
        setErrorMessage("❌ File size exceeds 25MB.");
        return;
      }

      setFile(selectedFile);
      setErrorMessage(null);
      setSuccessMessage(null);
    },
    [setFile, setErrorMessage, setSuccessMessage]
  );

  const handleUpload = useCallback(async () => {
    if (!file || !userDetails || processing) return;
    if (!creditStatus || creditStatus.available <= 0) {
      setErrorMessage("❌ Not enough credits to process this file.");
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setProcessing(true);
    setProgress(0);
    setPhase("uploading");

    // Step 1: Blinking uploading for 3 seconds
    const uploadingTimeout = setTimeout(() => {
      setPhase("analysing");
    }, 3000);

    // Step 2: Smooth fake progress until 95%
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 3 + 1, 95));
    }, 500);

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

      if (!response.ok) throw new Error("Failed to process file");

      const blob = await response.blob();
      const creditsHeader = response.headers.get("X-Credits-Used");
      const creditsUsed = creditsHeader ? parseInt(creditsHeader, 10) : 1;

      setProgress(100);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(".pdf", ".docx");
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      // Step 3: Reset phase so button goes back to normal immediately
      setPhase("idle");

      setSuccessMessage(
        `✅ File Successfully Downloaded. Service Used ${creditsUsed} Credits.`
      );

      if (creditStatus) {
        setCreditStatus((prev) => ({
          ...prev,
          available: prev.available - creditsUsed,
        }));
      }

      // Step 4: After 5 seconds, reset everything for next upload
      setTimeout(() => {
        setProcessing(false);
        setProgress(0);
        setFile(null);
        setSuccessMessage(null);
      }, 5000);

    } catch (error) {
      console.error("Upload failed:", error);
      setErrorMessage("❌ Something went wrong while processing your file.");
      setTimeout(() => {
        setProcessing(false);
        setProgress(0);
        setFile(null);
        setPhase("idle");
      }, 1500);
    } finally {
      clearInterval(interval);
      clearTimeout(uploadingTimeout);
    }
  }, [
    file,
    userDetails,
    processing,
    creditStatus,
    setProcessing,
    setProgress,
    setErrorMessage,
    setSuccessMessage,
    setFile,
    setCreditStatus,
  ]);

  return (
    <>
      <div
        onDrop={processing ? undefined : handleDrop}
        onDragOver={(e) => !processing && e.preventDefault()}
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
        className={`w-full mt-6 px-4 py-3 rounded-lg font-semibold transition ${
          file && !processing
            ? "bg-[#E6A24B] text-white hover:bg-[#d68d32]"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {phase === "uploading" && processing ? (
          <span className="animate-pulse">Uploading...</span>
        ) : phase === "analysing" && processing ? (
          <span className="animate-pulse">Suvichaar AI is Analysing...</span>
        ) : (
          "Upload PDF to begin"
        )}
      </button>
    </>
  );
};

// ------------------------------------
// Main Component
// ------------------------------------
function OcrCore() {
  const [userDetails, setUserDetails] = useState(null);
  const [creditStatus, setCreditStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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
    setFile(null);
    setProcessing(false);
    setProgress(0);
    setErrorMessage(null);
    setSuccessMessage("");
  };

  const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
      <div
        className="bg-[#E6A24B] h-3 transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  const renderContent = () => {
    if (loading)
      return <p className="text-center text-gray-600">Loading service status...</p>;

    if (!creditStatus)
      return (
        <p className="text-center text-red-600 font-semibold">
          Service not found for your account. Please contact{" "}
          <a
            href="mailto:support@contentlabs.com"
            className="text-[#E6A24B] text-sm font-medium hover:underline"
          >
            contentlabs@suvichaar.org
          </a>
        </p>
      );

    if (!creditStatus.isActive)
      return (
        <p className="text-center text-red-600 font-semibold">
          This service is <span className="underline">inactive</span> for your account.
          <br />
          Please contact{" "}
          <a
            href="mailto:support@contentlabs.com"
            className="text-[#E6A24B] text-sm font-medium hover:underline"
          >
            contentlabs@suvichaar.org
          </a>
        </p>
      );

    if (creditStatus.available <= 0)
      return (
        <p className="text-center text-red-600 font-semibold">
          Your credits for this tool are <span className="underline">completed</span>.
          <br />
          Please contact{" "}
          <a
            href="mailto:support@contentlabs.com"
            className="text-[#E6A24B] text-sm font-medium hover:underline"
          >
            contentlabs@suvichaar.org
          </a>
        </p>
      );

    return (
      <>
        <Uploader
          file={file}
          setFile={setFile}
          processing={processing}
          setProcessing={setProcessing}
          setProgress={setProgress}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          userDetails={userDetails}
          creditStatus={creditStatus}
          setCreditStatus={setCreditStatus}
        />
        {errorMessage && (
          <div className="mt-4 text-red-600 font-semibold text-sm">{errorMessage}</div>
        )}
        {processing && <ProgressBar progress={progress} />}
        <div className="mt-6 text-xs text-gray-500">
          • Each extracted page deducts 1 credit from your balance.
        </div>
        {successMessage && (
          <div className="mt-4 text-green-600 text-sm font-semibold">{successMessage}</div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#B7D4E9] via-white to-[#E6A24B] text-black p-6 relative">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border border-[#B7D4E9]">
        <h1 className="text-2xl font-bold mb-2 text-center text-[#E6A24B]">OCR Core</h1>
        <p className="text-center text-gray-600 mb-6">
          Extracts text from images, scanned PDFs, and handwritten notes with
          reliable accuracy. Designed for everyday digitization needs across
          printed and handwritten content.
        </p>
        {renderContent()}
      </div>
    </div>
  );
}

export default OcrCore;

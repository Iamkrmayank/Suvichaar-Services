import { useState, useRef, useEffect } from "react";
import { Repeat } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase_config/config";

const OCR_ADVANCE_SERVICE_ID = "CL_SER_2";
const OCR_ADVANCE_API =
  "https://us-central1-content-labs-8b84e.cloudfunctions.net/processAdvanceOcr";

const OcrAdvanceService = ({ uploadedPdfFile, creditStatus, setCreditStatus }) => {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const phaseRef = useRef(phase);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // ✅ File validation
  const validateFile = (file) => {
    if (!file) return "❌ No file selected.";
    if (file.type && file.type !== "application/pdf")
      return "❌ Only PDF files are supported.";
    if (file.size > 25 * 1024 * 1024) return "❌ File size exceeds 25MB.";
    return null;
  };

  const handleOcrAdvance = async () => {
    const user = auth.currentUser;

    if (!uploadedPdfFile) {
      setErrorMessage("❌ No uploaded PDF file to convert.");
      return;
    }

    const validationError = validateFile(uploadedPdfFile);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (!user) {
      setErrorMessage("❌ You must be logged in to convert files.");
      return;
    }

    if (!creditStatus || creditStatus.available <= 0) {
      setErrorMessage("❌ You don't have enough credits.");
      return;
    }

    try {
      setProcessing(true);
      setPhase("uploading");
      setProgress(0);
      setErrorMessage(null);
      setSuccessMessage(null);

      // Simulated progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (phaseRef.current === "uploading") {
            return Math.min(prev + Math.random() * 1 + 0.5, 60);
          } else if (phaseRef.current === "analysing") {
            return Math.min(prev + Math.random() * 0.8 + 0.5, 95);
          } else {
            return prev;
          }
        });
      }, 400);

      // Fake 5s uploading phase
      await new Promise((r) => setTimeout(r, 5000));
      setPhase("analysing");

      // Read file
      const pdfBytes = new Uint8Array(
        await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsArrayBuffer(uploadedPdfFile);
        })
      );

      const idToken = await user.getIdToken();

      // Upload request to OCR Advanced cloud function
      const response = await fetch(OCR_ADVANCE_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/pdf",
        },
        body: pdfBytes,
      });

      if (!response.ok) throw new Error("Failed to process file");

      const blob = await response.blob();

      // Credits
      const creditsHeader = response.headers.get("X-Credits-Used");
      const creditsUsed = creditsHeader ? parseInt(creditsHeader, 10) : 1;

      if (creditStatus.available < creditsUsed) {
        setErrorMessage("❌ Not enough credits to deduct after processing.");
        clearInterval(interval);
        setProcessing(false);
        setPhase("idle");
        setProgress(0);
        return;
      }

      // Firestore update
      const creditRef = doc(
        db,
        "Credits",
        user.uid,
        "UserCredits",
        OCR_ADVANCE_SERVICE_ID
      );
      const creditSnap = await getDoc(creditRef);

      if (!creditSnap.exists()) {
        setErrorMessage("❌ Credit record not found.");
        clearInterval(interval);
        setProcessing(false);
        setPhase("idle");
        setProgress(0);
        return;
      }

      const latestCredits = creditSnap.data();

      if (latestCredits.available < creditsUsed) {
        setErrorMessage("❌ Not enough credits in your account.");
        clearInterval(interval);
        setProcessing(false);
        setPhase("idle");
        setProgress(0);
        return;
      }

      await updateDoc(creditRef, {
        available: latestCredits.available - creditsUsed,
        used: (latestCredits.used || 0) + creditsUsed,
      });

      setCreditStatus((prev) => ({
        ...prev,
        available: prev.available - creditsUsed,
        used: (prev.used || 0) + creditsUsed,
      }));

      clearInterval(interval);
      setProgress(100);

      // ✅ Trigger file download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = uploadedPdfFile.name.replace(".pdf", ".docx");
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setPhase("downloaded");
      setSuccessMessage(
        `✅ File Successfully Downloaded. Used ${creditsUsed} Credits.`
      );

      // Reset after 5s
      setTimeout(() => {
        setProcessing(false);
        setProgress(0);
        setSuccessMessage(null);
        setPhase("idle");
      }, 5000);
    } catch (err) {
      console.error("Error in OCR Advanced:", err);
      setErrorMessage("❌ Something went wrong during conversion.");
      setProcessing(false);
      setProgress(0);
      setPhase("idle");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-orange-100">
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-tr from-orange-50 to-orange-100 flex-shrink-0">
          <Repeat className="w-6 h-6 text-orange-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">OCR Advance</h3>
      </div>

      <p className="text-sm text-gray-600 flex-1 mb-4">
        High-precision OCR that handles complex layouts, tables, multi-language
        documents, and low-quality scans. Provides enterprise-grade recognition
        for detailed document processing.
      </p>

      {creditStatus && (
        <div className="p-3 mb-4 bg-yellow-100 rounded-md">
          <h3 className="font-semibold text-sm">Your Credits</h3>
          <p>
            Available: <strong>{creditStatus.available}</strong> / Total:{" "}
            <strong>{creditStatus.total}</strong>
          </p>
          <p className="text-xs">{creditStatus.equivalent}</p>
        </div>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleOcrAdvance();
        }}
        disabled={processing}
        className={`w-full px-4 py-2 rounded-lg font-medium text-white shadow hover:shadow-md transition ${processing
            ? "bg-orange-400 cursor-not-allowed"
            : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500"
          }`}
      >
        {phase === "uploading" && processing ? (
          <span className="animate-pulse">Uploading...</span>
        ) : phase === "analysing" && processing ? (
          <span className="animate-pulse">Suvichaar AI is Analysing...</span>
        ) : phase === "downloaded" ? (
          <span className="text-green-600">✅ File Downloaded</span>
        ) : (
          "Convert PDF to DOCX"
        )}
      </button>

      {processing && (
        <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
          <div
            className="bg-orange-500 h-3 transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {successMessage && (
        <div className="mt-3 text-green-600 text-sm font-semibold">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mt-3 text-red-600 text-sm font-semibold">
          {errorMessage}
        </div>
      )}
    </div>

  );
};

export default OcrAdvanceService;

import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { applyActionCode, getAuth } from "firebase/auth";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("Verifying...");
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const mode = searchParams.get("mode");
        const oobCode = searchParams.get("oobCode");

        if (mode === "verifyEmail" && oobCode) {
            applyActionCode(auth, oobCode)
                .then(async () => {
                    await auth.currentUser?.reload(); // refresh
                    setStatus("✅ Your email has been verified successfully!");
                    setTimeout(() => navigate("/login"), 3000);
                })
                .catch(() => {
                    setStatus("❌ Verification link is invalid or expired.");
                });
        } else {
            setStatus("Invalid verification link");
        }
    }, [searchParams, navigate, auth]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900 px-4">
            <div className="relative bg-gray-800 text-white shadow-lg rounded-lg p-10 max-w-md w-full border border-gray-700 hover:shadow-[0_0_25px_5px_rgba(56,140,248,1)] transform transition-all duration-500 ease-out">
                <h2 className="text-3xl font-bold text-center mb-6">Email Verification</h2>
                <p className="text-center text-lg font-medium text-cyan-400">{status}</p>
                <p className="text-gray-400 text-center text-sm mt-4">You’ll be redirected to login shortly...</p>
            </div>
        </div>
    );
};

export default VerifyEmail;

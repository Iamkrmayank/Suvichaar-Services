
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Login from "./User_Dashboard/Login";
import Signup from "./User_Dashboard/Signup";

const AuthDialog = ({ open, onClose, onSuccess }) => {
  const [mode, setMode] = useState("login"); // login/signup

  useEffect(() => {
    if (!open) setMode("login"); // reset mode when closed
  }, [open]);

  const handleSuccess = (userData) => {
    if (onSuccess) onSuccess(userData);
    onClose(); // ✅ close the popup after successful login/signup
  };

  return (
    // <Dialog open={open} onOpenChange={onClose} modal={true}>
    <Dialog open={open} modal={true}>
      <DialogContent className="max-w-md rounded-2xl shadow-2xl bg-white border border-gray-200">
        {mode === "login" ? (
          <Login
            isDialog={true}
            onSwitchToSignup={() => setMode("signup")}
            onClose={onClose}
            onSuccess={handleSuccess}
          />
        ) : (
          <Signup
            isDialog={true}
            onSwitchToLogin={() => setMode("login")}
            onClose={onClose}
            onSuccess={handleSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;

// src/components/ui/dialog.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const DialogContext = createContext(null);

export function Dialog({ open: controlledOpen, onOpenChange, children }) {
  const isControlled = controlledOpen !== undefined;
  const [open, setOpen] = useState(isControlled ? controlledOpen : false);

  useEffect(() => {
    if (isControlled) setOpen(controlledOpen);
  }, [controlledOpen, isControlled]);

  const setOpenWithCallback = (val) => {
    if (!isControlled) setOpen(val);
    if (onOpenChange) onOpenChange(val);
  };

  return (
    <DialogContext.Provider value={{ open, setOpen: setOpenWithCallback }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogContent({ children, className = "" }) {
  const ctx = useContext(DialogContext);
  const open = ctx?.open;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") ctx.setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, ctx]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => ctx.setOpen(false)}
      />
      {/* Modal box */}
      <div
        className={`relative z-10 w-full max-w-md mx-4 ${className}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export function DialogHeader({ children, className = "" }) {
  return <div className={`px-4 py-3 ${className}`}>{children}</div>;
}

export function DialogTitle({ children, className = "" }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

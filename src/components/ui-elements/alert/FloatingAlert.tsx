import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Alert } from "@/components/ui-elements/alert";

interface FloatingAlertProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  variant?: "success" | "warning" | "error";
  duration?: number;
}

export function FloatingAlert({
  isVisible,
  onClose,
  title,
  description,
  variant = "success",
  duration = 3000,
}: FloatingAlertProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return createPortal(
    <div className="fixed right-5 top-5 z-[99999] w-full max-w-sm animate-in fade-in slide-in-from-top-5">
      <Alert
        variant={variant}
        title={title}
        description={description}
        className="shadow-lg"
      />
    </div>,
    document.body
  );
}

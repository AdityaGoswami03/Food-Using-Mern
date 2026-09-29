import React from "react";

interface AlertMessageProps {
  type: "danger" | "success" | "warning" | "info";
  message: string;
  onClose?: () => void;
}

export default function AlertMessage({ type, message, onClose }: AlertMessageProps) {
  if (!message) return null;

  return (
    <div
      className={`alert alert-${type} py-2 px-3 small rounded-3 mb-3 d-flex align-items-center justify-content-between`}
      role="alert"
    >
      <span>{message}</span>
      {onClose && (
        <button
          type="button"
          className="btn-close btn-close-sm"
          aria-label="Close"
          onClick={onClose}
        ></button>
      )}
    </div>
  );
}

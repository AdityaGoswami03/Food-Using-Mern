import React from "react";

interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export default function InputField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  autoComplete,
  isPassword = false,
  showPassword = false,
  onTogglePassword,
}: InputFieldProps) {
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label small fw-semibold text-light mb-1">
        {label}
      </label>
      <div className={isPassword ? "input-group" : ""}>
        <input
          type={inputType}
          className="form-control bg-dark text-white border-secondary"
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
        />
        {isPassword && onTogglePassword && (
          <button
            type="button"
            className="btn btn-outline-secondary text-secondary"
            onClick={onTogglePassword}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>
    </div>
  );
}

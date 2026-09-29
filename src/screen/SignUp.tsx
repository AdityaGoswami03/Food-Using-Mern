import { Link } from "react-router-dom";
import { useSignUp } from "../hooks/useSignUp";
import InputField from "../components/common/InputField";
import AlertMessage from "../components/common/AlertMessage";

export default function SignUp() {
  const {
    formData,
    showPassword,
    showConfirmPassword,
    loading,
    errorMessage,
    successMessage,
    handleChange,
    handleSubmit,
    toggleShowPassword,
    toggleShowConfirmPassword,
    clearError,
  } = useSignUp();

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 py-5">
      <div
        className="card shadow-lg p-4 p-md-5 rounded-4 border-0"
        style={{ maxWidth: "480px", width: "100%", backgroundColor: "#1e1e24", color: "#f8f9fa" }}
      >
        {/* Card Header */}
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1">Create an Account ✨</h2>
          <p className="text-secondary small">Join Go-Food to explore tasty meals around you</p>
        </div>

        {/* Notifications */}
        <AlertMessage type="danger" message={errorMessage} onClose={clearError} />
        <AlertMessage type="success" message={successMessage} />

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <InputField
            id="name"
            name="name"
            label="Full Name"
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />

          <InputField
            id="email"
            name="email"
            label="Email address"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <InputField
            id="password"
            name="password"
            label="Password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            isPassword
            showPassword={showPassword}
            onTogglePassword={toggleShowPassword}
            autoComplete="new-password"
            required
          />

          <InputField
            id="confirmPassword"
            name="confirmPassword"
            label="Re-enter Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            isPassword
            showPassword={showConfirmPassword}
            onTogglePassword={toggleShowConfirmPassword}
            autoComplete="new-password"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-success w-100 py-2 fw-semibold rounded-3 d-flex justify-content-center align-items-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Creating Account...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4 pt-2 border-top border-secondary">
          <p className="text-secondary small mb-0">
            Already have an account?{" "}
            <Link to="/login" className="text-success text-decoration-none fw-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

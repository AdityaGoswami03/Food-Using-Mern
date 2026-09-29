import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LoginResponse {
  success: boolean;
  message: string;
  authToken?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export default function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:9090/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid email or password");
      }

      if (data.authToken) {
        localStorage.setItem("authToken", data.authToken);
        if (data.user) {
          localStorage.setItem("userEmail", data.user.email);
          localStorage.setItem("userName", data.user.name);
        }
      }

      // Navigate to homepage
      navigate("/home");
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 py-5">
      <div
        className="card shadow-lg p-4 p-md-5 rounded-4 border-0"
        style={{ maxWidth: "440px", width: "100%", backgroundColor: "#1e1e24", color: "#f8f9fa" }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1">Welcome Back 👋</h2>
          <p className="text-secondary small">Log in to continue ordering delicious food</p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3 d-flex align-items-center justify-content-between" role="alert">
            <span>{errorMessage}</span>
            <button
              type="button"
              className="btn-close btn-close-sm"
              aria-label="Close"
              onClick={() => setErrorMessage("")}
            ></button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label small fw-semibold text-light">
              Email address
            </label>
            <input
              type="email"
              className="form-control bg-dark text-white border-secondary"
              id="email"
              name="email"
              placeholder="name@example.com"
              value={credentials.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <label htmlFor="password" className="form-label small fw-semibold text-light mb-1">
                Password
              </label>
            </div>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control bg-dark text-white border-secondary"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="btn btn-outline-secondary text-secondary"
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-success w-100 py-2 fw-semibold rounded-3 d-flex justify-content-center align-items-center gap-2"
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Logging in...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4 pt-2 border-top border-secondary">
          <p className="text-secondary small mb-0">
            Don't have an account?{" "}
            <Link to="/create-user" className="text-success text-decoration-none fw-semibold">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

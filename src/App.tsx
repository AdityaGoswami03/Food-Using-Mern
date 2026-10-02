import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./screen/Home";
import Login from "./screen/Login";
import SignUp from "./screen/SignUp";
import AddFood from "./screen/AddFood";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AdminRoute from "./components/AdminRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Landing / Login: If already authenticated, redirect to /home. Otherwise, show Login */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/create-user"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />

          {/* Protected Home Route */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Add Food Route */}
          <Route
            path="/add-food"
            element={
              <AdminRoute>
                <AddFood />
              </AdminRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

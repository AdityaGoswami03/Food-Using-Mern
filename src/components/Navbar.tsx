import { Link, useNavigate } from "react-router-dom";
import { isAdmin, clearAuth } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const userName = localStorage.getItem("userName");
  const userIsAdmin = isAdmin();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };
  const handleAddFood = () => {
    navigate("/add-food");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to={token ? "/home" : "/login"}>
          Go-Food
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {token ? (
              <>
                {userName && <span className="text-light small">Hi, {userName}</span>}
                {userIsAdmin && (
                  <button className="btn btn-outline-success btn-sm" onClick={handleAddFood}>
                    + Add Food
                  </button>
                )}
                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <div className="d-flex gap-2">
                <Link className="btn btn-outline-light btn-sm" to="/login">
                  Login
                </Link>
                <Link className="btn btn-success btn-sm" to="/create-user">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

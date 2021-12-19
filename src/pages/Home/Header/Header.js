import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { googleSignOut } from "../../../globalState/GlobalStateSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user, isUserLoading } = useSelector((state) => state.globalState);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            SAGAR WASH
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              {user ? (
                <div className="d-flex">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn active"
                      onClick={() => dispatch(googleSignOut())}
                    >
                      Logout-({user.displayName})
                    </button>
                  </li>
                </div>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons";
import AuthService from "../services/auth.service";
import { useGlobalContext } from "../context";
import TableSavers from "../assets/TableSavers.png";

export default function NavBar() {
  const { isLoggedIn, setIsLoggedIn } = useGlobalContext();
  const logfunc = () => {
    AuthService.logout();
    setIsLoggedIn(false);
  };
  return (
    <nav className="navbar">
      <div className="nav-center">
        <Link to="/">
          <img src={TableSavers} alt="restaurant logo" className="logo" />
        </Link>

        <ul className="nav-links">
          <li>
            {isLoggedIn ? (
              <Link to="/restaurant">Reserve a Table</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
          |
          <li>
            {isLoggedIn ? (
              <Link to="/myreservations">My Reservations</Link>
            ) : (
              <Link to="/register">Sign-Up</Link>
            )}
          </li>
          |
          <li>
            {isLoggedIn ? (
              <Link to="/edituser">
                <FontAwesomeIcon icon={faUserCircle} />
              </Link>
            ) : (
              <Link to="/login">
                <FontAwesomeIcon icon={faUserCircle} />
              </Link>
            )}
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/login" onClick={logfunc}>
                <FontAwesomeIcon icon={faSignOut} />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../utilities.css";  // Keep your existing import
import "./navBar.css";

const NavBar = () => {
  const location = useLocation();

  const navLinks = [
    { to: "/home", text: "My Notes" },
    { to: "/feed", text: "Feed" },
    { to: "/profile", text: "My Profile" }
  ];

  return (
    <nav className="navBar-container">
      <Link to="/home" className="navBar-Title">
        Purpose Pad
      </Link>

      <ul className="menu open">
        {navLinks.map((link, index) => (
          <li
            key={link.to}
            style={{ "--index": index + 1 }}
          >
            <Link
              to={link.to}
              className={`NavBar-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;

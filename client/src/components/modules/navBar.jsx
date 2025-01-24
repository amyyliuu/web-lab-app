import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css";

const NavBar = () => {
  return (
    <nav className="navBar-container">
      <div className="navBar-Title">Purpose Pad</div>
      <ul className="menu">
        <li>
          <Link to="/home" className="NavBar-link">
            My Notes
          </Link>
        </li>
        <li>
          <Link to="/feed" className="NavBar-link">
            Friend Activity
          </Link>
        </li>
        <li>
          <Link to="/profile" className="NavBar-link">
            My Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

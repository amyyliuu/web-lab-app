import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className="navBar-container">
            <div className="navBar-Title">Purpose Pad</div>
            <ul class="menu">
              <li><a href="#">My Notes</a></li>
              <li><Link to="/feed">Friend Activity</Link></li>
              <li><a href="#">My Profile</a></li>
            </ul>
        </nav>

    );
};

export default NavBar;

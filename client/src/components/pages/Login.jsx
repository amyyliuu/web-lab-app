import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../App";
import "./Login.css";  // Import the updated CSS file

const LoginPage = ({ onLogin }) => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome to Purpose Pad</h2>
        <div className="app-goal">
          <p>
            Purpose Pad is your space to <span className="highlight">share thoughts</span>,{" "}
            <span className="highlight">collaborate on ideas</span>, and{" "}
            <span className="highlight">grow together</span>. Start your journey today!
          </p>
        </div>
        <p className="login-subtitle">
          Log in using your Google account to get started.
        </p>
        <GoogleLogin onSuccess={handleLogin} />
        <div className="app-features">
          <div className="feature-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.371 0 0 5.371 0 12C0 18.629 5.371 24 12 24C18.629 24 24 18.629 24 12C24 5.371 18.629 0 12 0ZM12 22.364C6.556 22.364 2.036 17.844 2.036 12C2.036 6.156 6.556 1.636 12 1.636C17.844 1.636 22.364 6.156 22.364 12C22.364 17.844 17.844 22.364 12 22.364Z" fill="currentColor"/>
            </svg>
            <span>More sharing, more thinking, less waiting.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

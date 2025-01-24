import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../App";

// Ensure that the backend URL is set in your .env file

const LoginPage = ({ onLogin }) => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

  return (
    <div>
      <h2>Login Page</h2>
      <GoogleLogin onSuccess={handleLogin} />
    </div>
  );
};

export default LoginPage;

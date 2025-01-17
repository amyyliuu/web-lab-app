import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";
import { UserContext } from "../App";

const Skeleton = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  return (
    <>
      {userId ? (
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
      )}
      <head>
        <title>Purpose Pad</title>
        <link rel="stylesheet" href="Skeleton.css" />
      </head>

      <body>
        <div class="container">
          <nav class="navbar">
            <h1>Purpose Pad</h1>
            <ul class="menu">
              <li><a href="#">My Notes</a></li>
              <li><a href="#">Friend Activity</a></li>
              <li><a href="#">My Profile</a></li>
            </ul>
          </nav>

          <main class="mainContent">
            <h2>My Notes</h2>
            <div class="noteGrid">
              <div class="note">Activity 1</div>
              <div class="note">Activity 2</div>
              <div class="note">Activity 3</div>
              <div class="note">Activity 4</div>
            </div>
          </main>

          <aside class="progressWidget">
            <h3>Progress</h3>
            <p>67% of goals reached</p>
            <ul>
              <li>Work: 73%</li>
              <li>Personal: 50%</li>
              <li>Hobbies: 86%</li>
            </ul>
          </aside>
        </div>
      </body>
    </>
  );
};

export default Skeleton;

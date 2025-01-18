import React, { useContext, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import NavBar from "../modules/navBar";
import Progress from "../modules/progress";
import Feed from "./Feed";
import "../../utilities.css";
import "./Skeleton.css";
import { UserContext } from "../App";


const Skeleton = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [progress, setProgress] = useState(0);

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
          <NavBar />

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
            <Progress progress={progress} />
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

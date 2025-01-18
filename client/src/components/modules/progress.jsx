import React from "react";
import "./progress.css";

const Progress = (props) => {
    return (
        <div className = "Progress-container">
            <h3>Progress</h3>
            {props.progress}
            <ul>
              <li>Work: 73%</li>
              <li>Personal: 50%</li>
              <li>Hobbies: 86%</li>
            </ul>
        </div>
    );
};

export default Progress;

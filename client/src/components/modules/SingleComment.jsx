import React from "react";
import "../../utilities.css";  // Keep your existing import
import "./Comment.css"; // Import the new CSS

const SingleComment = (props) => {
  return (
    <div className="Card-commentBody">
      {props.creator_profilePicture && (
        <img
          src={props.creator_profilePicture}
          alt={`${props.creator_name}'s profile`}
          className="Comment-profilePicture"
        />
      )}
      <div className="Comment-content">
        <span className="u-bold">{props.creator_name}</span>
        <span>{" | " + props.content}</span>
      </div>
    </div>
  );
};

export default SingleComment;

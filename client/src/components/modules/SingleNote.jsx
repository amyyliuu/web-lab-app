import React from "react";
import "../../utilities.css";  // Keep your existing import
import "./Note.css"; // Import the updated CSS

const SingleNote = ({ creator_name, creator_profilePicture, content, timestamp }) => {
  return (
    <div className="Note-story">
      <div className="Note-header">
        {creator_profilePicture && (
          <img
            src={creator_profilePicture}
            alt={`${creator_name}'s profile`}
            className="Note-profilePicture"
          />
        )}
        <h1 className="u-bold">
          {creator_name}
          {timestamp && (
            <span className="Note-timestamp">
              {new Date(timestamp).toLocaleDateString()}
            </span>
          )}
        </h1>
      </div>
      <div className="Note-storyContent">{content}</div>
    </div>
  );
};

export default SingleNote;

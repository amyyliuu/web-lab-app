import React from "react";
import "./Note.css";

const SingleNote = ({creator_name, content, timestamp}) => {
    return (
    <div className = "Note-story">
        <h1 className = "u-bold">
            {creator_name}
            {timestamp && (
                <span className="Note-timestamp">
                    {new Date(timestamp).toLocaleDateString()}
                </span>
            )}
        </h1>
        <div className="Note-storyContent">{content}</div>
    </div>
    );
};


export default SingleNote;

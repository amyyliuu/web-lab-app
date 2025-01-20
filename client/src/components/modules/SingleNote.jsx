import React from "react";
import "./Note.css";

const SingleNote = (props) => {
    return (
    <div className = "Note-story">
        <h1 className = "u-bold">{props.creator_name}</h1>
        <div className="Note-storyContent">{props.content}</div>

    </div>
    );
};


export default SingleNote;

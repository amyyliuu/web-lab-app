import React, { useState } from "react";

import "./NewPostInput.css";
import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} noteId optional prop, used for comments
 * @param {({noteId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const NewPostInput = (props) => {
  const [value, setValue] = useState("");
  const [isPublic, setIsPublic] = useState(false);


  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value, isPublic);
    setValue("");
  };
  console.log("Rendering NewPostInput");
  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      {!props.isComment && (
        <label>
          <input type="checkbox" checked={isPublic} onChange={handleToggle} />
          Make Public
        </label>
      )}
      <button
        type="submit"
        className="NewPostInput-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} noteId to add comment to
 */
const NewComment = (props) => {
  const addComment = (value) => {
    const body = { parent: props.noteId, content: value };
    post("/api/comment", body).then((comment) => {
      // display this comment on the screen
      props.addNewComment(comment);
    });
  };

  return <NewPostInput defaultText="New Comment" onSubmit={addComment} isComment={true} />;
};

/**
 * New Story is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
const NewNote = (props) => {
  const addNote = (value, isPublic) => {
    const body = { content: value, isPublic: isPublic};
    post("/api/notes", body).then((note) => {
      // display this story on the screen
      props.addNewNote(note);
      console.log("NewNote is rendered");
    });
  };

  return <NewPostInput defaultText="New Note" onSubmit={addNote} />;
};

/**
 * New Message is a New Message component for messages
 *
 * Proptypes
 * @param {UserObject} recipient is the intended recipient
 */
const NewMessage = (props) => {
  const sendMessage = (value) => {
    const body = { recipient: props.recipient, content: value };
    post("/api/message", body);
  };

  return <NewPostInput defaultText="New Message" onSubmit={sendMessage} />;
};

export { NewComment, NewNote, NewMessage, NewPostInput };

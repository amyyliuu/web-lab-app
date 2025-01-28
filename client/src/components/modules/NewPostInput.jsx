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
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!value.trim()) return;

    setIsLoading(true);
    try {
      await props.onSubmit(value, isPublic);
      setIsSuccess(true);
      setValue("");
      // Reset success state after animation
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClassName = `NewPostInput-input ${
    isSuccess ? 'success-fade' : ''
  }`;

  const buttonClassName = `NewPostInput-button u-pointer ${
    isLoading ? 'loading' : ''
  } ${isSuccess ? 'success' : ''}`;

  console.log("Rendering NewPostInput");
  return (
    <div className="new-post-container">
      <div className="u-flex">
        <input
          type="text"
          placeholder={props.defaultText}
          value={value}
          onChange={handleChange}
          className={inputClassName}
          disabled={isLoading}
        />
        {!props.isComment && (
          <label className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={handleToggle}
              disabled={isLoading}
              className="custom-checkbox"
            />
            <span className="checkbox-label">Make Public</span>
          </label>
        )}
        <button
          type="submit"
          className={buttonClassName}
          onClick={handleSubmit}
          disabled={isLoading || !value.trim()}
        >
          {isLoading ? '': isSuccess ? 'Posted!' : 'Submit'}
        </button>
      </div>
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

  return <NewPostInput defaultText="Write a comment..." onSubmit={addComment} isComment={true} />;
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

  return <NewPostInput defaultText="Share your thoughts..." onSubmit={addNote} />;
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

  return <NewPostInput defaultText="Type your message..." onSubmit={sendMessage} />;
};

export { NewComment, NewNote, NewMessage, NewPostInput };

import React from "react";
import SingleComment from "./SingleComment";
import { NewComment } from "./NewPostInput";
import "../../utilities.css";  // Keep your existing import

/**
 * @typedef ContentObject
 * @property {string} _id of note/comment
 * @property {string} creator_name
 * @property {string} content of the note/comment
 */

/**
 * Component that holds all the comments for a note
 *
 * Proptypes
 * @param {ContentObject[]} comments
 * @param {ContentObject} note
 */
// In CommentsBlock.js
const CommentsBlock = (props) => {
  return (
    <div className="Card-commentSection">
      {props.comments.map((comment) => (
        <SingleComment
          key={`Comment_${comment._id}`}
          creator_name={comment.creator_name}
          creator_id={comment.creator_id}
          creator_profilePicture={comment.creator_profilePicture} // Add this line
          content={comment.content}
        />
      ))}
      {props.userId && (
        <NewComment noteId={props.note._id} addNewComment={props.addNewComment} />
      )}
    </div>
  );
};

export default CommentsBlock;

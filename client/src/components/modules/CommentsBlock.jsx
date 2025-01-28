import React from "react";
import SingleComment from "./SingleComment";
import { NewComment } from "./NewPostInput";

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
const CommentsBlock = (props) => {
  return (
    <div className="Card-commentSection">
      <div className="note-comments">
        {props.comments.map((comment) => (
          <SingleComment
            key={`SingleComment_${comment._id}`}
            _id={comment._id}
            creator_name={comment.creator_name}
            creator_id={comment.creator_id}
            content={comment.content}
          />
        ))}
        {props.userId && (
          <NewComment noteId={props.note._id} addNewComment={props.addNewComment} />
        )}
      </div>
    </div>
  );
};

export default CommentsBlock;

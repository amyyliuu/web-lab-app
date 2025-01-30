import React, { useState, useEffect } from "react";
import SingleNote from "./SingleNote";
import CommentsBlock from "./CommentsBlock";
import { get } from "../../utilities";
import "../../utilities.css";  // Keep your existing import
import "./Card.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */
const Card = (props) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    get("/api/comment", { parent: props._id }).then((comments) => {
      setComments(comments);
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewComment = (commentObj) => {
    setComments(comments.concat([commentObj]));
  };

  return (
    <div className="Card-container">
      <SingleNote
        _id={props._id}
        creator_name={props.creator_name}
        creator_id={props.creator_id}
        creator_profilePicture={props.creator_profilePicture} // Add this line
        content={props.content}
      />
      <CommentsBlock
        note={props}
        comments={comments}
        creator_id={props.creator_id}
        userId={props.userId}
        addNewComment={addNewComment}
      />
    </div>
  );
};

export default Card;

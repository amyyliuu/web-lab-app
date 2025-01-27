import React, { useEffect, useState } from "react";
import "./Card.css";
import SingleNote from "./SingleNote";
import SingleComment from "./SingleComment";


const Card = (props) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        setComments(comments.filter((comment) => comment.parent==props._id));

    }, []);

    let commentsList = null;
    const hasComments = comments.length != 0;
    if (hasComments) {
        commentsList = comments.map((commentObj) => (
            <SingleComment key={commentObj._id} {...commentObj} />
        ));
    } else {
        commentsList = <div>No comments!</div>
    }



    return <div>
        <SingleNote _id={props._id} creator_name={props.creator_name} content={props.content} />
        {commentsList}
    </div>
}

export default Card;

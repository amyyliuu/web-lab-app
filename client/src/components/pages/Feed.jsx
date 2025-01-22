import React from "react";
import SingleNote from "../modules/SingleNote";
import { useOutletContext } from "react-router-dom";

const Feed = () => {
  const { publicNotes } = useOutletContext();  // Access public notes from context

  return (
    <div className="feed">
      <h2>Public Feed</h2>
      {publicNotes.length > 0 ? (
        publicNotes.map((note) => (
          <SingleNote
            key={note._id}
            _id={note._id}
            creator_name={note.creator_name}
            content={note.content}
          />
        ))
      ) : (
        <p>No public notes yet.</p>
      )}
    </div>
  );
};

export default Feed;

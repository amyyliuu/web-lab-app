// Feed.jsx
import React, { useState, useEffect } from "react";
import SingleNote from "../modules/SingleNote";

const Feed = () => {
  const [publicNotes, setPublicNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/notes");
        const notes = await response.json();
        setPublicNotes(notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []); // Fetch notes when the component mounts

  return (
    <div>
      <h2>Public Feed</h2>
      {publicNotes.length > 0 ? (
        publicNotes.map((note) => <SingleNote key={note._id} {...note} />)
      ) : (
        <p>No public notes yet.</p>
      )}
    </div>
  );
};

export default Feed;

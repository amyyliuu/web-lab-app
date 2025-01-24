// Feed.jsx
import React, { useState, useEffect } from "react";
import SingleNote from "../modules/SingleNote";
import NavBar from "../modules/navBar";
import "./Feed.css";

const Feed = () => {
  const [publicNotes, setPublicNotes] = useState([]);

  useEffect(() => {
    const fetchPublicNotes = async () => {
      try {
        const response = await fetch("/api/publicnotes");
        const notes = await response.json();
        setPublicNotes(notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchPublicNotes();
  }, []); // Fetch notes when the component mounts

  return (
    <div className="container">
      <NavBar />
      <main className="mainContent">
        <h2>Public Feed</h2>
        {publicNotes.length > 0 ? (
            publicNotes.map((note) => <SingleNote key={note._id} {...note} />)
        ) : (
            <p>No public notes yet.</p>
        )}
      </main>
    </div>
  );
};

export default Feed;

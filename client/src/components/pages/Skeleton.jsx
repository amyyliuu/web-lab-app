import React, { useState, useEffect } from "react";
import NavBar from "../modules/navBar";
import Progress from "../modules/progress";
import NewPostInput from "../modules/NewPostInput";
import "../../utilities.css";
import "./Skeleton.css";
import { useOutletContext } from "react-router-dom";

const Skeleton = () => {
  const [myNotes, setMyNotes] = useState([]);
  const { addPublicNote } = useOutletContext();

  useEffect(() => {
    const fetchMyNotes = async () => {
      try {
        const response = await fetch("/api/mynotes");
        const data = await response.json();
        setMyNotes(data);
      } catch (error) {
        console.error("Error fetching my notes:", error);
      }
    };

    fetchMyNotes();
  }, []);

  const addPrivateNote = (note) => {
    const newNote = {
      _id: Date.now(),
      content: note,
      creator_name: "Anon",
    };
    setMyNotes([...myNotes, newNote]);
  };

  return (
    <div className="container">
      <NavBar />
      <main className="mainContent">
        <h2>My Notes</h2>
        <NewPostInput
          defaultText="Enter a note"
          onAddPrivateNote={addPrivateNote}
          onAddPublicNote={addPublicNote}
        />
        <div>
          {myNotes.length > 0 ? (
            myNotes.map((note) => (
              <div key={note._id} className="note">
                {note.content}
              </div>
            ))
          ) : (
            <p>No notes yet.</p>
          )}
        </div>
      </main>
      <aside className="progressWidget">
        <Progress />
        <h3>Progress</h3>
        <p>67% of goals reached</p>
      </aside>
    </div>
  );
};

export default Skeleton;

import React, { useState, useEffect, useContext } from "react";
import NavBar from "../modules/navBar";
import Card from "../modules/Card";

import Progress from "../modules/progress";
import { NewNote } from "../modules/NewPostInput";
import "../../utilities.css";
import "./Skeleton.css";
import { get } from "../../utilities";
import { UserContext } from "../App"; // Adjust path if needed

const EmptyState = () => (
  <div className="card empty-state">
    <h3>No notes yet!</h3>
    <p>Start your journey by creating your first note above.</p>
  </div>
);

const Welcome = ({ username }) => (
  <div className="welcome-banner">
    <h1>Welcome back, {username}!</h1>
    <p>What's on your mind today?</p>
  </div>
);

const Skeleton = (props) => {
  const [myNotes, setMyNotes] = useState([]);
  const { userId, username } = useContext(UserContext); // Access userId from context
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Purpose Pad | My Notes";
    get("/api/mynotes").then((noteObjs) => {
      let reversedNoteObjs = noteObjs.reverse();
      setMyNotes(reversedNoteObjs);
      console.log("mynotes retrived: ", noteObjs);
    });
  }, [username]);

  const addNewNote = (noteObj) => {
    setMyNotes((prevNotes) => [noteObj, ...prevNotes]); // Use functional update
  };


  console.log('User ID:', userId);
  return (
    <div className="container">
      <NavBar />
      <main className="mainContent">
        <Welcome username={username} />

        {userId &&(
          <div className="note-creation-section">
            <NewNote addNewNote={addNewNote} />
          </div>
        )}

        <div className="notes-section">
          {myNotes.length > 0 ? (
            myNotes.map((noteObj) => (
              <Card
                key={`Card_${noteObj._id}`}
                _id={noteObj._id}
                creator_name={noteObj.creator_name}
                creator_id={noteObj.creator_id}
                userId={userId}
                content={noteObj.content}
                timestamp={noteObj.timestamp}
                isPublic={noteObj.isPublic}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
      <aside className="progressWidget">
        <Progress />
        <p>67% of goals reached</p>
      </aside>
    </div>
  );
};

export default Skeleton;

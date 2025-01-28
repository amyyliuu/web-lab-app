import React, { useState, useEffect, useContext } from "react";
import NavBar from "../modules/navBar";
import Card from "../modules/Card";

import Progress from "../modules/progress";
import { NewNote } from "../modules/NewPostInput";
import "../../utilities.css";
import "./Skeleton.css";
import { get } from "../../utilities";
import { UserContext } from "../App"; // Adjust path if needed


const Skeleton = (props) => {
  const [myNotes, setMyNotes] = useState([]);
  const { userId } = useContext(UserContext); // Access userId from context

  useEffect(() => {
    document.title = "My Notes";
    get("/api/mynotes").then((noteObjs) => {
      let reversedNoteObjs = noteObjs.reverse();
      setMyNotes(reversedNoteObjs);
      console.log("mynotes retrived: ", noteObjs);
    });
  }, []);

  const addNewNote = (noteObj) => {
    setMyNotes((prevNotes) => [noteObj, ...prevNotes]); // Use functional update
  };

  let myNotesList = null;
  const hasNotes = myNotes.length !== 0;
  if (hasNotes) {
    myNotesList = myNotes.map((noteObj) => (
      <Card
        key={`Card_${noteObj._id}`}
        _id={noteObj._id}
        creator_name={noteObj.creator_name}
        creator_id={noteObj.creator_id}
        userId={userId}
        content={noteObj.content}
      />
    ));
  } else {
    myNotesList = <div>No notes!</div>;
  }
  console.log('User ID:', userId);
  return (
    <div className="container">
      <NavBar />
      <main className="mainContent">
        {userId && <NewNote addNewNote={addNewNote} />}
        {myNotesList}
      </main>
      <aside className="progressWidget">
        <Progress />
        <p>67% of goals reached</p>
      </aside>
    </div>
  );
};

export default Skeleton;

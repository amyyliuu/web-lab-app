import React, { useContext, useState, useEffect } from "react";
import SingleNote from "../modules/SingleNote";
import NavBar from "../modules/navBar";
import "../../utilities.css"; // Keep your existing import
import "./Feed.css";
import Card from "../modules/Card";
import { NewNote } from "../modules/NewPostInput";
import { UserContext } from "../App"; // Adjust path if needed
import { get } from "../../utilities";

const Feed = (props) => {
  const [publicNotes, setPublicNotes] = useState([]);
  const { userId } = useContext(UserContext); // Access userId from context

  useEffect(() => {
    get("/api/publicnotes").then((noteObjs) => {
      let reversedNoteObjs = noteObjs.reverse();
      setPublicNotes(reversedNoteObjs);
    });
  }, []);

  const addNewPublicNote = (noteObj) => {
    setPublicNotes((prevNotes) => [noteObj, ...prevNotes]); // Use functional update
  };

  let publicNotesList = null;
  const hasNotes = publicNotes.length !== 0;
  if (hasNotes) {
    publicNotesList = publicNotes.map((noteObj) => (
      <Card
        key={`Card_${noteObj._id}`}
        _id={noteObj._id}
        creator_name={noteObj.creator_name}
        creator_id={noteObj.creator_id}
        creator_profilePicture={noteObj.creator_profilePicture}
        userId={userId}
        content={noteObj.content}
        timestamp={noteObj.timestamp}
        isPublic={noteObj.isPublic}
      />
    ));
  } else {
    publicNotesList = <div className="empty-state">No public notes yet. Be the first to share!</div>;
  }

  return (
    <div className="container">
      <NavBar />
      <main className="mainContent">
        {/* Header for the Feed Page */}
        <div className="feed-header">
          <h1>Feed</h1>
          <p>Explore and engage with notes from the community. Share your thoughts, ideas, and inspirations.</p>
        </div>

        {/* Single-Column Public Notes Feed */}
        <div className="noteFeed">{publicNotesList}</div>
      </main>
    </div>
  );
};

export default Feed;

import React, { useState } from "react";
import NavBar from "../modules/navBar";
import Progress from "../modules/progress";
import NewPostInput from "../modules/NewPostInput";
import "../../utilities.css";
import "./Skeleton.css";

const Skeleton = () => {
    const [privateNotes, setPrivateNotes] = useState([]);

    const addPrivateNote = (note) => {
        const newNote = {
            _id: Date.now(),
            content: note,
            creator_name: "Anon",
        };
        setPrivateNotes([...privateNotes, newNote]);
    };

    return (
        <div className="container">
            <NavBar />
            <main className="mainContent">
                <h2>My Notes</h2>
                <NewPostInput
                    defaultText="Enter a note"
                    onAddPrivateNote={addPrivateNote}
                />
                <div>
                    {privateNotes.length > 0 ? (
                        privateNotes.map((note) => (
                            <div key={note._id} className="note">
                                {note.content}
                            </div>
                        ))
                    ) : (
                        <p>No private notes yet.</p>
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

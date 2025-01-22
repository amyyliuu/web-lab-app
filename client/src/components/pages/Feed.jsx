import React, { useState } from "react";
import SingleNote from "../modules/SingleNote";

const Feed = () => {
    const [publicNotes, setPublicNotes] = useState([]);

    const addPublicNote = (note) => {
        const newNote = {
            _id: Date.now(),
            content: note,
            creator_name: "Anon",
        };
        setPublicNotes([...publicNotes, newNote]);
    };

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

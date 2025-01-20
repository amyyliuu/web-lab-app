import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SingleNote from "../modules/SingleNote";
import { NewPostInput, NewNote } from "../modules/NewPostInput";
function Feed() {
    const [notes, setNotes] = useState([]);

    const addNewNote = (note) => {
        setNotes([...notes, note]);
    }
    useEffect(() => {

        const note1 = {
            _id: 1,
            creator_name: "person1",
            content: "content1"
        }
        const note2 = {
            _id: 2,
            creator_name: "person2",
            content: "content2"
        }
        const note3 = {
            _id: 3,
            creator_name: "person3",
            content: "content3"
        }
        setNotes([note1, note2, note3]);


    }, [])

    let notesList = null;
    if (notes.length != 0) {
        notesList = notes.map((note) => {
            return(
                <SingleNote _id={note._id} creator_name={note.creator_name} content={note.content} />
            )
        })

    } else {
        notesList = <div>There aren't any notes.</div>
    }
    return (
        <div className="feed">
            <NewNote addNewNote = {addNewNote} />
            {notesList}
            {/* Link back to the Skeleton page */}
            <Link to="/">Go to Skeleton</Link>
        </div>
    );
}

export default Feed;

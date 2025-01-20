import React, { useState } from "react";
import "./NewPostInput.css";

const NewPostInput = (props) => {
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit && props.onSubmit(value);
        setValue("");
    };

    return (
        <div className="u-flex">
            <input
            type="text"
            placeholder={props.defaultText}
            value={value}
            onChange={handleChange}
            className="NewPostInput-input"
            />
            <button
            type="submit"
            className="NewPostInput-button u-pointer"
            value="Submit"
            onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );

};


const NewNote = (props) => {
    const addNote = (value) => {
        props.addNewNote({_id: "random", creator_name: "Anon", content: value});


    };
    return <NewPostInput defaultText="Enter Note Here" onSubmit={addNote}/>
};

const NewComment = (props) => {
    const addComment = (value) => {

    };
};

export { NewNote, NewComment, NewPostInput };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewPostInput.css";

const NewPostInput = (props) => {
  const [value, setValue] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isPublic) {
      props.onAddPublicNote(value); // Add public note
    } else {
      props.onAddPrivateNote(value); // Add private note
    }
    setValue("");
    setIsPublic(false); // Reset toggle
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
      <label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={handleToggle}
        />
        Make Public
      </label>
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

export default NewPostInput;

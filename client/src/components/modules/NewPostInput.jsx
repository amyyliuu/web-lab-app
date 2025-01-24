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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (value.trim()) {
      const newNote = {
        content: value,
        creator_name: "User's Name", // Replace with actual user data from your app
        isPublic,
      };

      try {
        await fetch("/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote),
        });

        setValue(""); // Clear the input after submission
        setIsPublic(false); // Reset the public toggle
      } catch (error) {
        console.error("Error submitting note:", error);
      }
    }
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

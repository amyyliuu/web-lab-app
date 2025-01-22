import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { socket } from "../client-socket";
import { get, post } from "../utilities";

export const UserContext = createContext(null);

const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [publicNotes, setPublicNotes] = useState([]);  // Track public notes

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        setUserId(user._id);
      }
    });
  }, []);

  const addPublicNote = (note) => {
    const newNote = {
      _id: Date.now(),
      content: note,
      creator_name: "Anon",
    };
    setPublicNotes((prevNotes) => [...prevNotes, newNote]);  // Update public notes
  };

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  const authContextValue = {
    userId,
    handleLogin,
    handleLogout,
  };

  return (
    <UserContext.Provider value={authContextValue}>
      <Outlet context={{ publicNotes, addPublicNote }} /> {/* Pass publicNotes and addPublicNote */}
    </UserContext.Provider>
  );
};

export default App;

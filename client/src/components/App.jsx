import React, { useState, useEffect, createContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { socket } from "../client-socket";
import { get, post } from "../utilities";

export const UserContext = createContext(null);

const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [publicNotes, setPublicNotes] = useState([]); // Track public notes
  const navigate = useNavigate();

  useEffect(() => {
    get("/api/whoami").then((user) => {
      console.log("User from /api/whoami:", user); // Log the full user object
      if (user._id) {
        console.log("usr still in session!");
        setUserId(user._id);
        // navigate("home");
      }
    });
  }, []);

  const addPublicNote = (note) => {
    const newNote = {
      _id: Date.now(),
      content: note,
      creator_name: "Anon",
    };
    setPublicNotes((prevNotes) => [...prevNotes, newNote]); // Update public notes
  };

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
      navigate("home");
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
      <Outlet /> {/* Pass publicNotes and addPublicNote */}
    </UserContext.Provider>
  );
};

export default App;

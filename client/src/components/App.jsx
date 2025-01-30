import React, { useState, useEffect, createContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { socket } from "../client-socket";
import { get, post } from "../utilities";
export const UserContext = createContext(null);

const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        setUserId(user._id);
        setUsername(user.name || "");
        setProfilePicture(user.profilePicture || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2YwZjBmMCIgcng9Ijc1IiByeT0iNzUiLz48cGF0aCBkPSJNNzUgODBjMTMuOCAwIDI1LTExLjIgMjUtMjVTODguOCAzMCA3NSAzMCA1MCA0MS4yIDUwIDU1czExLjIgMjUgMjUgMjV6TTM3LjUgMTEwaDc1YzAgMCAwLTEwLTEyLjUtMTUtMTIuNS01LTUwLTUtNjIuNSAwLTEyLjUgNS0xMi41IDE1LTEyLjUgMTV6IiBmaWxsPSIjOTA5MDkwIi8+PC9zdmc+");
        // navigate("home");
      }
    });
  }, [username]);

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
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setUsername(user.name);
      setProfilePicture(user.profilePicture || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2YwZjBmMCIgcng9Ijc1IiByeT0iNzUiLz48cGF0aCBkPSJNNzUgODBjMTMuOCAwIDI1LTExLjIgMjUtMjVTODguOCAzMCA3NSAzMCA1MCA0MS4yIDUwIDU1czExLjIgMjUgMjUgMjV6TTM3LjUgMTEwaDc1YzAgMCAwLTEwLTEyLjUtMTUtMTIuNS01LTUwLTUtNjIuNSAwLTEyLjUgNS0xMi41IDE1LTEyLjUgMTV6IiBmaWxsPSIjOTA5MDkwIi8+PC9zdmc+");
      post("/api/initsocket", { socketid: socket.id });
      navigate("home");
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    setUsername("");
    post("/api/logout");
  };

  const authContextValue = {
    userId,
    username,
    setUsername,
    profilePicture,
    setProfilePicture,
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

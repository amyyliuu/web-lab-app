import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../App";
import NavBar from "../modules/navBar";
import { get, post } from "../../utilities";
import "../../utilities.css";  // Keep your existing import


const ProfilePage = () => {
  const defaultProfileImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2YwZjBmMCIgcng9Ijc1IiByeT0iNzUiLz48cGF0aCBkPSJNNzUgODBjMTMuOCAwIDI1LTExLjIgMjUtMjVTODguOCAzMCA3NSAzMCA1MCA0MS4yIDUwIDU1czExLjIgMjUgMjUgMjV6TTM3LjUgMTEwaDc1YzAgMCAwLTEwLTEyLjUtMTUtMTIuNS01LTUwLTUtNjIuNSAwLTEyLjUgNS0xMi41IDE1LTEyLjUgMTV6IiBmaWxsPSIjOTA5MDkwIi8+PC9zdmc+';
  const [localProfilePicture, setLocalProfilePicture] = useState(defaultProfileImage);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const { userId, setUsername, profilePicture, setProfilePicture } = useContext(UserContext);

  useEffect(() => {
    if (userId) {
      get(`/api/profile/${userId}`).then((profile) => {
        if (profile) {
          setLocalProfilePicture(profile.profilePicture || defaultProfileImage);
          setName(profile.name || "");
          setBio(profile.bio || "");
        }
      });
    }
  }, [userId]);

  const handlePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const newProfilePic = reader.result;
        try {
          const response = await post("/api/updatePicture", { profilePicture: newProfilePic });
          if (response.user) {
            setProfilePicture(newProfilePic); // Update global context
            setLocalProfilePicture(newProfilePic); // Update local state
          } else {
            alert("Failed to update profile picture");
          }
        } catch (error) {
          console.error("Error updating profile picture:", error);
          alert("Failed to update profile picture");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const updateUsername = async (newUsername) => {
    try {
      const response = await post("/api/updateUsername", { userId, name: newUsername });
      if (response.user) {
        setUsername(newUsername);
      }
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  const handleProfileUpdate = async () => {
    if (!userId) {
      alert("User ID is not available.");
      return;
    }

    const profileData = {
      name,
      bio,
      profilePicture: localProfilePicture,
    };

    try {
      const response = await post(`/api/profile/${userId}`, profileData);
      if (response.ok) {
        await updateUsername(name);
        alert("Profile updated successfully!");

        // Refresh profile data
        const updatedProfile = await get(`/api/profile/${userId}`);
        if (updatedProfile) {
          setLocalProfilePicture(updatedProfile.profilePicture || defaultProfileImage);
          setName(updatedProfile.name || "");
          setBio(updatedProfile.bio || "");
          setProfilePicture(updatedProfile.profilePicture || defaultProfileImage);
        }
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile.");
    }
  };

  // Rest of the component remains the same...
  return (
    <div style={{ paddingTop: '60px' }}>
      <NavBar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: '30px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div>
              <img
                src={localProfilePicture}
                alt="Profile"
                style={{ width: '120px', height: '120px', borderRadius: '50%' }}
              />
              <label
                htmlFor="profile-picture-input"
                style={{
                  display: 'inline-block',
                  marginTop: '10px',
                  padding: '8px 12px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Change Picture
                <input
                  id="profile-picture-input"
                  type="file"
                  accept="image/*"
                  onChange={handlePictureChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>

          <div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="name-input" style={{ fontWeight: 'bold' }}>
                Name
              </label>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  marginTop: '5px',
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="bio-input" style={{ fontWeight: 'bold' }}>
                Bio
              </label>
              <textarea
                id="bio-input"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder="Write something about yourself..."
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  marginTop: '5px',
                }}
              />
            </div>

            <button
              onClick={handleProfileUpdate}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '5px',
                marginTop: '20px',
                cursor: 'pointer',
              }}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

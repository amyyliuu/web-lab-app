// ProfilePage.jsx
import React, { useState } from 'react';
import './Profile.css';

const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/150');
  const [name, setName] = useState('John Doe');
  const [bio, setBio] = useState('This is a short bio.');

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePicture(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-picture">
        <img src={profilePicture} alt="Profile" />
        <input
          type="file"
          accept="image/*"
          onChange={handlePictureChange}
          className="upload-input"
        />
      </div>
      <div className="profile-details">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="name-input"
          placeholder="Enter your name"
        />
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="bio-input"
          placeholder="Write something about yourself..."
        />
      </div>
    </div>
  );
};

export default ProfilePage;

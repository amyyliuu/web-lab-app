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

  // Function to handle profile update
  const handleProfileUpdate = async () => {
    const profileData = {
      name,
      bio,
      profilePicture,
    };

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating your profile.');
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
      <button onClick={handleProfileUpdate}>Update Profile</button>
    </div>
  );
};

export default ProfilePage;

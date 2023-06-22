import React, { useEffect, useState } from "react";
import { Box, useMediaQuery, Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    picturePath: "",
  });

  const getUser = async () => {
    const response = await fetch(`http://localhost:6001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    setEditedProfile(data); // Set initial values for edited profile
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteProfile = () => {
    // Implement logic to delete the profile
    console.log("Deleting profile...");
  };

  const handleUpdateProfile = () => {
    // Implement logic to update the profile
    console.log("Updating profile...");
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    // Implement logic to save the edited profile
    console.log("Saving profile...", editedProfile);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setEditedProfile({
      ...editedProfile,
      picturePath: URL.createObjectURL(file),
    });
  };

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
      <Box textAlign="center" mt="2rem">
        {isEditing ? (
          <React.Fragment>
            <TextField
              name="firstName"
              label="First Name"
              value={editedProfile.firstName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="lastName"
              label="Last Name"
              value={editedProfile.lastName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="email"
              label="Email"
              value={editedProfile.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              style={{ display: "none" }}
              id="profilePictureInput"
            />
            <label htmlFor="profilePictureInput">
              <Button variant="contained" component="span">
                Change Profile Picture
              </Button>
            </label>
            <Box m="1rem 0" />
            <Button variant="contained" color="primary" onClick={handleSaveProfile}>
              Save Profile
            </Button>
            <Box m="1rem 0" />
            <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button variant="contained" color="secondary" onClick={handleDeleteProfile}>
              Delete Profile
            </Button>
            <Box m="1rem 0" />
            <Button variant="contained" color="primary" onClick={handleEditProfile}>
              Edit Profile
            </Button>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;

import React, { useEffect, useState } from "react";
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  List,
  ListItem,
  ListIcon,
  TabPanels,
  Text,
  Flex,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { usersState } from "../States/users/UsersState";

export default function Profile() {
  const { user, fetchUserData, UpdateUserWithProfile } = usersState();
  const [profileFileInput, setProfileFileInput] = useState(null);
  const [profileImageData, setProfileImageData] = useState(null);

  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordResetError, setPasswordResetError] = useState('');


  //first we were using this state in profile and dashboard jsx So when we upload the note with image it also upload in th eprofile.jsx so we make it different 
  // const [selectedImageForDisplay, setselectedImageForDisplay] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
      try {
        if (user && user.profileImage) {
          const profileImageId = user.profileImage;
          let paramOfProfile = `http://localhost:5000/api/images/${profileImageId}`;
          await fetchAndDisplayImage(paramOfProfile);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []); // No need to listen for changes in userWithImage



  const onChangeHandle = (e) => {
    setProfileFileInput(e.target.files[0]);
  };

  const handleImageUploadForProfile = async () => {
    if (profileFileInput) {
      const formData = new FormData();
      formData.append("image", profileFileInput);

      fetch("http://localhost:5000/api/images/upload", {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      })
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            console.log("Received image data:", data);
            await fetchAndDisplayImage(data.imageUrl);
            UpdateUserWithProfile(data._id); // Pass the image ID to the function



          } else {
            throw new Error("Image upload failed.");
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };


  const fetchAndDisplayImage = (imageUrlOfProfile) => {
    fetch(imageUrlOfProfile, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then(async (response) => {
        if (response.ok) {
          // await console.log(response);
          return response.blob();
        }
        throw new Error("Failed to fetch the image.");
      })
      .then((blob) => {
        const ProfileUrlACTUAL = URL.createObjectURL(blob);
        // setselectedImageForDisplay(ProfileUrlACTUAL);
        setProfileImageData(ProfileUrlACTUAL);
        // console.log(blob);
        // console.log(ProfileUrlACTUAL);

        // Save the image URL in localStorage

      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  };


  const openPasswordResetModal = () => {
    setIsPasswordResetModalOpen(true);
  };

  // Function to close password reset modal
  const closePasswordResetModal = () => {
    setIsPasswordResetModalOpen(false);
  };


  const handlePasswordReset = async () => {
    // Check if the passwords match
    if (newPassword !== confirmPassword) {
      setPasswordResetError('Passwords do not match');
      return;
    }
  
    try {
      // Send a PUT request to the API to update the password
      const response = await fetch('http://localhost:5000/api/users/updatePassword', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      });
  
      if (response.ok) {
        // Password reset successful
        setPasswordResetError('');
        setNewPassword('');
        setConfirmPassword('');
        closePasswordResetModal(); // Close the modal
      } else {
        const data = await response.json();
        setPasswordResetError(data.error);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setPasswordResetError('Failed to reset password');
    }
  };

  return (

    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
      <Tabs mt={"40px"} p={"20px"} color={"purple.300"} variant={"enclosed"}>
        <TabList>
          <Tab _selected={{ color: "white", bg: "purple.300", borderRadius: 0, marginLeft: "3rem" }}>Account Info</Tab>
          {/* <Tab _selected={{ color: "white", bg: "purple.300" }}>Task History</Tab> */}
        </TabList>

        <TabPanels>
          {/* 1st */}

          <TabPanel>
            <List spacing={4}>
              {user && (
                <>
                  <ListItem>
                    <Flex>
                      <Text>Username : </Text>
                      <Text>{user.username}</Text>
                    </Flex>
                  </ListItem>
                  <Flex>
                    <Text>Email : </Text>
                    <Text>{user.email}</Text>
                  </Flex>

                  {/* Reset Password Button */}
                  <Button colorScheme="blue" size="sm" onClick={openPasswordResetModal}>
                    Reset Password
                  </Button>

                  <div style={{ minWidth: "300px" /* Adjust the minimum width as needed */ }}>

                    <Button
                      border="none"
                      m="10px"
                      width="40%"
                    // bgColor="purple.100"
                    >
                      <label htmlFor="noteImageInput" style={{ cursor: "pointer" }}>
                        selectProfileImage
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        id="noteImageInput"
                        style={{ display: "none" }}
                        onChange={onChangeHandle}
                      />

                    </Button>

                    <Button
                      bg={"purple.300"}
                      onClick={handleImageUploadForProfile}
                      style={{ margin: "20px" }}
                    >
                      Upload Image
                    </Button>
                  </div>
                </>
              )}
            </List>
          </TabPanel>

          {/* 2nd */}
          {/* <TabPanel>
            <List spacing={4}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color={"teal.400"} />
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </ListItem>
              <ListItem>
                <ListIcon as={WarningIcon} color={"red.400"} />
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color={"teal.400"} />
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </ListItem>
              <ListItem>
                <ListIcon as={WarningIcon} color={"red.400"} />
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color={"teal.400"} />
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </ListItem>
            </List>
          </TabPanel> */}


        </TabPanels>
      </Tabs>

      <div style={{ minWidth: "300px", marginTop: "50px" }}>
        {profileImageData && (
          <div style={{ width: "200px", height: "200px" }}>
            <img
              src={profileImageData}
              alt="Selected"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
      </div>



      {/* Password Reset Modal */}
      <Modal isOpen={isPasswordResetModalOpen} onClose={closePasswordResetModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordResetError && (
              <Text color="red">{passwordResetError}</Text>
            )}

          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handlePasswordReset}>
              Reset
            </Button>
            <Button variant="ghost" onClick={closePasswordResetModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </div>
  );
}

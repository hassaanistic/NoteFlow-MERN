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
  useToast,
  Box,
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

  const toast = useToast();

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
        toast({
          title: 'Success',
          description: 'Password Changed Successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: "bottom-right",

        });
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

    <Box  height={"80vh"} >
      <Tabs h={{ base: "auto", sm: "50vh", md: "50vh", lg: "30vh", }} mt={"40px"} color={"purple.300"} variant={"enclosed"}>

        <TabList>
          <Tab _selected={{ color: "white", bg: "purple.300", borderRadius: 0, marginLeft: "3rem" }}>Account Info</Tab>
          {/* <Tab _selected={{ color: "white", bg: "purple.300" }}>Task History</Tab> */}
        </TabList>


        <TabPanels >
          {/* 1st */}

          <TabPanel width={"80vw"}   >
            <Flex width={"100%"}  flexDir={{ base: "column", sm: "row", md: "row", lg: "row" }} height={{ base: "70vh", sm: "90vh", md: "70vh", lg: "70vh" }} justifyContent={"space-between"} alignItems={{ base: "start", sm: "start", md: "center", lg: "center" }} >


              <Flex alignItems={"start"} justifyContent={"center"} flexDir={"column"}  width={"50%"} height={"100%"} >
                <List height={"auto"} spacing={4}>
                  {user && (
                    <>
                      <Flex alignItems={"start"} justifyContent={"start"} flexDir={"column"}>
                        <ListItem>
                          <Flex>
                            <Text>Username : </Text>
                            <Text>{user.username}</Text>
                          </Flex>
                        <Flex>
                          <Text>Email : </Text>
                          <Text>{user.email}</Text>
                        </Flex>
                        </ListItem>

                        {/* Reset Password Button */}
                        <Button colorScheme="blue" size="sm" onClick={openPasswordResetModal}>
                          Reset Password
                        </Button>

                      </Flex>

                    </>
                  )}


                </List>
              </Flex>


              <Flex flexDir={"column"} justifyContent={"start"} alignItems={"start"}  width={"50%"}  height={"100%"}  >
                <Box minW={{ base: "200px", sm: "200px", md: "300px", lg: "300px", }} marginTop={"50px"} >
                  {profileImageData && (
                    <Box w={{ base: "100px", sm: "150px", md: "200px", lg: "200px", }} h={{ base: "100px", sm: "150px", md: "200px", lg: "200px", }}  >
                      <img
                        src={profileImageData}
                        alt="Selected"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Box>
                  )}
                </Box>

                <Flex  w={{ base: "100%", sm: "100%", md: "300px", lg: "300px" }}   alignItems={{ base: "start", sm: "start", md: "start", lg: "start" }} justifyContent={'start '} flexDirection={{ base: "column", sm: "column", md: "row", lg: "row" }} >

                  <Button
                    border="none"
                    m="10px"
                    width="50%"
                  // bgColor="purple.100"
                  >
                    <label htmlFor="noteImageInput" style={{ cursor: "pointer" }}>
                      selectImage
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
                    Upload
                  </Button>
                </Flex>
              </Flex>
            </Flex>
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

    </Box >
  );
}

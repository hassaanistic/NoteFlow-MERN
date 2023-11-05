import { UnlockIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Flex, HStack, VStack, Heading, Spacer, Text, useToast, Avatar, AvatarBadge, border, Image } from '@chakra-ui/react'
// import { wrap } from 'framer-motion'
import React, { useState, useEffect } from 'react'

import { useNavigate } from "react-router-dom";



function Navbar() {
  let navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState(null);

  const handleLoginAndSignUp = () => {
    navigate("/register");
  }

  
  useEffect(() => {
    //for some reason the fetchUserData() is not importing from the usersStates
    //so we make it here and we first check if the CurrentUser is present or not if present then show the Logout else loginAndSignup
    fetchUserData();
  }, []);

  // Fetch user data function
  const fetchUserData = () => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/users/current', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch user data');
          }
        })
        .then((userData) => {
          // Set the user data in your state
          setUser(userData);
        })
        .catch((error) => console.error('Error fetching user data', error));
    }
  };


  const handleLogout =  async() => {
   await navigate("/");

    // Simulate a logout action and set the isLoggedIn state to false
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('selectedImageForDisplay');

    // localStorage.clear();
    setUser(null); // Clear user data
    toast({
      title: 'Logged Out',
      description: 'You are now logged out.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });
    // navigate("/")  ;
  };

  return (
    <Flex height={"9vh"} mt={"20px"} borderRadius={50} boxShadow='xs' bg='white' width={"90%"} as={"nav"} paddingX={"30px "} paddingY={"10px"} alignItems={"center"} gap={"10px"}>
      <Flex gap={2} alignItems={"Center"} >
        <Image h={'50px'} width={"50px"} src="/logo/logo.png" />
        <Text fontSize={"30px"} fontWeight={400} as={"h1"}>Note Flow</Text>
      </Flex>

      <Spacer />

      <HStack gap={"20px"}>
        {user ? ( // If user data is available, show Log Out
          <Button
            borderRadius={50}
            height={'35px'}
            width={'100px'}
            onClick={handleLogout}
            colorScheme='purple'
          >
            Log Out
          </Button>
        ) : (
          <>
            <Button
              borderRadius={50}
              height={'35px'}
              width={'100px'}
              onClick={handleLoginAndSignUp}
              colorScheme='purple'
            >
              Log In
            </Button>
            <Button
              borderRadius={50}
              height={'35px'}
              width={'100px'}
              onClick={handleLoginAndSignUp} // Change this to your sign-up logic
              colorScheme='purple'
            >
              Sign Up
            </Button>
          </>
        )}
      </HStack>
    </Flex>
  );
}

export default Navbar
import React, { useState, useEffect } from 'react'
import {  
   HStack,
     
        Image ,
        Button,
        Flex,
        Text,
        useToast,
        IconButton,
        Drawer,
        DrawerOverlay,
        DrawerContent,
        DrawerHeader,
        DrawerBody,
        DrawerFooter,
        VStack,
          useMediaQuery,
      } from '@chakra-ui/react'

import { useNavigate } from "react-router-dom";

import { HamburgerIcon } from '@chakra-ui/icons'; 

function Navbar() {
  let navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginAndSignUp = () => {
    navigate("/register");
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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


  const handleLogout = () => {
    navigate("/");

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



  
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  const [isMedScreen] = useMediaQuery("(max-width: 768px)");

  return (
    <Flex
      height={{
        sm: '11vh',
        md: '9vh',
        lg: '9vh',
      }}
      m="20px"
      boxShadow="xs"
      bg="white"
      width="100%"
      as="nav"
      paddingX={{ base: '20px', md: '30px' }}
      paddingY={{ base: '10px', md: '15px' }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex gap={2} alignItems="center">
        <Image h="50px" width="50px" src="/logo/logo.png" />
        <Text fontSize="30px" fontWeight={400} as="h1">
          Note Flow
        </Text>
      </Flex>
      {isSmallScreen && (
        <IconButton
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          onClick={toggleMenu}
        />
      )}
      {isMedScreen ? (
        <Drawer
          placement="top"
          isOpen={isMenuOpen}
          onClose={toggleMenu}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <VStack spacing="10px">
                {user ? (
                  <Button
                    height="35px"
                    width="100px"
                    onClick={handleLogout}
                    colorScheme="purple"
                  >
                    Log Out
                  </Button>
                ) : (
                  <>
                    <Button
                      height="35px"
                      width="100px"
                      onClick={handleLoginAndSignUp}
                      colorScheme="purple"
                    >
                      Log In
                    </Button>
                    <Button
                      height="35px"
                      width="100px"
                      onClick={handleLoginAndSignUp}
                      colorScheme="purple"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </VStack>
            </DrawerBody>
            <DrawerFooter>
              <Button
                height="35px"
                width="100px"
                onClick={toggleMenu}
                colorScheme="purple"
              >
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <HStack spacing="20px">
          {user ? (
            <Button
              height="35px"
              width="100px"
              onClick={handleLogout}
              colorScheme="purple"
            >
              Log Out
            </Button>
          ) : (
            <>
              <Button
                height="35px"
                width="100px"
                onClick={handleLoginAndSignUp}
                colorScheme="purple"
              >
                Log In
              </Button>
              <Button
                height="35px"
                width="100px"
                onClick={handleLoginAndSignUp}
                colorScheme="purple"
              >
                Sign Up
              </Button>
            </>
          )}
        </HStack>
      )}
    </Flex>
  );
            
}

export default Navbar
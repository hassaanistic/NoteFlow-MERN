import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Button, Box, Image, Flex, Text, Heading, VStack, Spacer, Center, useToast } from "@chakra-ui/react"

import Spinner from '../components/Spinner';
import { useNavigate } from "react-router-dom";



function FrontPage() {

  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();
  const toast = useToast();


  const gotToRegisterPage = () => {
    setIsLoading(true); // Show loading spinner when navigating
    navigate('/register');
  }
  return (
    <>
      {isLoading && <Spinner />}
      <Flex height={{ base: "12vh", md: "18vh" }} justify="center" bg="gray.200">
        <Navbar />
      </Flex>

      <Box width="100%" bg="gray.200" height="auto" >
        <Flex direction={{ base: "column", md: "row" }}>
          <Flex
            padding={{ base: "5%", md: "10%" }}
            alignItems={{ base: "center", md: "center" }}
            width={{ base: "100%", md: "50%" }}
            height={{ base: "44vh", md: "88vh" }}
          >
            <VStack spacing="10px" justifyContent="center">
              <Heading as="h1" fontSize={{ base: "40px", md: "70px" }}>
                Write Your Ideas
              </Heading>
              <Text textAlign={{ base: "start", sm: "center", lg: "start" }}>
                NoteFlow is the best place to jot down quick thoughts or to save longer notes filled with images or web links.
              </Text>

              <Flex w="100%" justifyContent={{ base: "center", sm: "center", lg: "start" }}>
                <Button borderRadius={50} height="35px" width="100px" onClick={gotToRegisterPage} colorScheme="purple">
                  Join Us
                </Button>
              </Flex>

            </VStack>
          </Flex>

          <Flex
            width={{ base: "100%", md: "50%" }}
            height={{ base: "44vh", md: "88vh" }}
            alignItems={{ base: "center", }}
            justifyContent={{ sm: "center", base: "center" }}
          >
            <Image bg="gray.500" borderRadius={30} padding="4%" src="/logo/illustrate.svg" height={{ base: "30vh", sm: "40vh", md: "60vh" }} />
          </Flex>
        </Flex>
      </Box>
    </>
  );

}

export default FrontPage
import React ,{useEffect} from 'react'
import Navbar from '../components/Navbar'
import { Button, Box, Image, Flex, Text, Heading, VStack, Spacer, Center ,useToast } from "@chakra-ui/react"
import {UnlockIcon } from "@chakra-ui/icons"

import { useNavigate } from "react-router-dom";


function FrontPage() {
    
    
  let navigate = useNavigate(); 
  const toast = useToast();

  const gotToRegisterPage = () =>{
    navigate("/register") 
  }
    return (
        <>

            <Flex height={"12vh"} justify={'Center'} bg={"gray.200"}>
                <Navbar />
            </Flex>

            <Box width={"100%"} bg={'gray.200'} height={"auto"} >
                <Flex height={"auto"} >

                    <Flex padding={"5%"}
                        alignItems={"center"}
                        width={"50%"}
                        height={"88vh"}
                        // bg={'gray.400'}
                        >
                            
                        <Flex height={"100%"} columnGap={"34px"} justifyContent={"center"} flexDir={"column"} >
                            <Heading as={"h1"} fontSize={"70px"} justifyContent={"space-between"} >Write Your ideas  </Heading>
                            <Flex justify={"Center"} alignItems={"Center"} height={"20%"}>NoteFlow is the best place to jot
                                down quick thoughts or to save
                                longer notes filled with
                                images or web links.</Flex>

                            <Button borderRadius={50} height={"35px"}  width={"100px"} onClick={gotToRegisterPage} colorScheme='purple'>Join Us</Button>
                        </Flex>

                    </Flex>

                    <Flex width={"50%"}
                        height={"88vh"}
                        alignItems={"center"}>
                        <Image bg={'gray.500'} borderRadius={30}  padding={'4%'} src={"/logo/illustrate.svg"} height={"60vh"} />
                    </Flex>
                </Flex>
            </Box>

        </>
    )
}

export default FrontPage
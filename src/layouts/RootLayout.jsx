import { Box, Center, Flex, Grid, GridItem } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar"

export default function RootLayout() {
  return (

    <>
      <Flex justify={'Center'} bg={"gray.200"}>

        <Navbar />
      </Flex>

      {/* repeat(6 , 1fr) 6 columns in the grid in one row */}

      <Grid templateColumns={{xl:"repeat(6 , 1fr)", lg:"repeat(6 , 1fr)" ,md:"repeat(1 , 1fr)",sm:"repeat(1 , 1fr)",base:"repeat(1 , 1fr)"  }} bg="gray.200" >
        <GridItem
          variant={"enclosed"}
          as={"aside"}
          borderRadius={4}
          mx={2}
          mt={7}

          colSpan={{  lg: 1, xl: 1 }}
          fontSize={{ base: "15px", md:"15px",lg: "15px",  xl: "20px" }}

          bg={"purple.300"}
          height={{ lg: "auto" }}
          paddingTop={{
            base: "20px",
            lg: "10px"
          }}
          paddingLeft={{
            base: "20px",
            lg: "10px"
          }}
        >

          <SideBar />
        </GridItem>


        <GridItem
          as={"aside"}
          colSpan={{ base: 4, lg: 4.5, xl: 5 }}
          bg={"gray.200"}
          minHeight={{ lg: "100vh" }}
          p={{ base: "20px", lg: "30px" }}
          width={{ base: "100vw", md: "100vw", lg:"100%"  }}
          justify={{ base: "center", md: "center", lg: "normal" }}


        >
          <Outlet />
        </GridItem>

      </Grid>
    </>
  )
}

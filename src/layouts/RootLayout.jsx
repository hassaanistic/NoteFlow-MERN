import { Box, Center, Flex, Grid, GridItem } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar"

export default function RootLayout() {
  return (

    <>
    <Flex justify={'Center'} bg={"gray.200"}>

      <Navbar  />
    </Flex>

      {/* repeat(6 , 1fr) 6 columns in the grid in one row */}

      <Grid templateColumns="repeat(6 , 1fr)" bg="gray.200" >
        <GridItem
          variant={"enclosed"}
          as={"aside"}
          borderRadius={4}
          mx={2}
          mt={7}

          colSpan={{ base: 2, lg: 1.5, xl: 1 }}
          bg={"purple.300"}
          height={{ lg: "auto" }}
          p={{ base: "20px", lg: "30px" }}
        >

          <SideBar />
        </GridItem>


        <GridItem
          as={"aside"}
          colSpan={{ base: 4, lg: 4.5, xl: 5 }}
          bg={"gray.200"}
          minHeight={{ lg: "100vh" }}
          p={{ base: "20px", lg: "30px" }}
        >

          <Outlet />
        </GridItem>

      </Grid>
    </>
  )
}

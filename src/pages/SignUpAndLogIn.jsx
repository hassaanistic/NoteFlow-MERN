import React, { useState } from 'react';
import '../styles/SignUpAndLogIn.css';
import {
  Tab, TabList, TabPanel, Tabs,
  List, ListItem, ListIcon, TabPanels
} from "@chakra-ui/react"
import Login from '../components/Login';
import SignUp from '../components/SignUp';




function SignUpAndLogIn() {
  


  return (
    <Tabs mt={"40px"} p={"20px"} color={"purple.300"} variant={"enclosed"}>

      <TabList>
        <Tab _selected={{ color: "white", bg: "purple.300" }}
        >LogIn
        </Tab>
        <Tab _selected={{ color: "white", bg: "purple.300" }}>
          SignUp
        </Tab>
      </TabList>


      <TabPanels>

        {/* //LogIn    */}

        <TabPanel>
            <Login/>
        </TabPanel>

        {/* //Signup    */}
        <TabPanel>
          <SignUp/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default SignUpAndLogIn;

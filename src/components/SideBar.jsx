import { List, ListIcon, ListItem } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import React from 'react'
import { AtSignIcon, CalendarIcon, EditIcon } from '@chakra-ui/icons'


//icons in chakra Ui are the "components" and we can pass the parameters and the can customize them 
//icons listIcons and button icons components 

function SideBar() {
    return (
        <List   color={"white"} fontSize={"1em"} spacing={4} >
            
            <ListItem  >
                <NavLink to="/auth">
                    <ListIcon 
                    as={CalendarIcon} 
                    color={"white"}  

                    />
                    Dashboard
                </NavLink>
            </ListItem>

            <ListItem>
                <NavLink to="/auth/create">
                <ListIcon 
                    as={EditIcon} 
                    color={"white"}  
                    />
                    New task
                </NavLink>
            </ListItem>

            <ListItem>
                <NavLink to="/auth/profile">
                <ListIcon 
                    as={AtSignIcon} 
                    color={"white"}  
                    />
                    Profile
                </NavLink>
            </ListItem>
        </List>
    )
}

export default SideBar
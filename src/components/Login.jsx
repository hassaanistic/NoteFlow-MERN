import { useState } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";
import { usersState } from '../States/users/UsersState'; // Adjust the import path

import { background, useToast } from "@chakra-ui/react"

const Login = () => {
    const toast = useToast();



    let navigate = useNavigate(); //firslty it is by name of  history in reacr-router
    const [credentials, setcredentials] = useState({ email: "", password: "" });
    const { login } = usersState();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(credentials.email, credentials.password);
            // console.log(response);
            navigate('/auth');


            toast({
                title: 'LoggedIn Success',
                description: 'You are now Signed In.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position : "bottom-right",
                
              });
          

            // You can add additional logic here, such as fetching user data after successful login
        } catch (error) {
            console.error('Login failed', error.message);
            toast({
                title: 'LoggedIn Failed',
                description: 'Wrong credentials.',
                status: "error",
                duration: 3000,
                isClosable: true,
                position : "bottom-right",
                
              });
        }
    };

    const onChng = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }


     const bgColorOfButton ={
        backgroundColor: "#B794F4",
        border : "none"
     }
        
    
    return (
        <div>
            <h2>Login to your account</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    {/* ////motherfucking very important */}
                    {/* this htmlfor and name and values are very important */}
                    <label htmlFor="email">Email address</label>
                    <input onChange={onChng} type="email" className="form-control" value={credentials.email} name='email' id="loginEmail" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={onChng} type="password" className="form-control" id="loginPassword" value={credentials.password} name='password' placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary"  style={bgColorOfButton} >Submit</button>
                {/* <button type="submit" className="btn btn-primary" onSubmit={handleSubmit} >Submit</button>   On submit form pr lagta ha button pr nhi   */}
            </form>
        </div>
    )
}

export default Login;
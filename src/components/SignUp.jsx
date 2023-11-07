import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersState } from '../States/users/UsersState'; // Import the usersState hook
import { useToast } from "@chakra-ui/react"


const SignUp = () => {

  const toast = useToast();


  const { signUp } = usersState(); // Get the signUp function from the context
  const [credentials, setcredentials] = useState({ username: "", email: "", password: "", cpassword: "" });
  const [profileImage , setProfileImage] = useState("654a0606ae776f56494a5be2");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = credentials;
  
    try {
      const response = await signUp({ username, email, password ,profileImage });
  
      if (response.accessToken) {
        // User is successfully signed up
        navigate('/auth');
        
        toast({
          title: 'SignUp Success',
          description: 'You are now Signed In.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom-right',
        });
      } else {
        // Handle unsuccessful sign-up
        console.error('Registration failed', response);
        toast({
          title: 'SignUp Failed',
          description: 'Already Registered.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-right',
        });
      }
    } catch (error) {
      console.error('Registration failed', error.message);
    }
  }

    

  
  const onChng = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  const bgColorOfButton ={
    backgroundColor: "#B794F4",
    border : "none"
 }
    


  return (
    <div className='container'>
      <h2>Create an account</h2>

      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input required onChange={onChng} type="text" className="form-control" name='username' id="name" aria-describedby="emailHelp" placeholder="Enter username" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input required onChange={onChng} type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input onChange={onChng} type="password" className="form-control" name='password' minLength={5} required id="password" placeholder="Password" />
        </div>
        {/* <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input onChange={onChng} type="password" className="form-control" name='cpassword' minLength={5} required id="cpassword" placeholder="Confirm Password" />
        </div> */}

        <button type="submit" className="btn btn-primary" style={bgColorOfButton}  >Submit</button>
      </form>
    </div>
  )
}

export default SignUp;
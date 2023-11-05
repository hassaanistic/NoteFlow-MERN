
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function usersState() {
  return useContext(UserContext);
}

export function UsersProvider({ children }) {
  const [user, setUser] = useState(null);
  // const [userWithImage, setUserWithImage] = useState(null); //exportIfUSE

 // Add a signUp function here
 const signUp = async (userData) => {
  try {
    const response = await fetch('http://localhost:5000/api/users/register', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const json = await response.json();
    localStorage.setItem('token', json.accessToken);

    setUser(json); // Set the user data in state
    // Update localStorage with the user data
    // localStorage.setItem('user', JSON.stringify(json));

    return json;
  } catch (error) {
    console.error('Registration failed', error.message);
    throw error;
  }
};


  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const loginData = await response.json();
      localStorage.setItem('token', loginData.accessToken);
      setUser(loginData); // Set the user data in state
      // Update localStorage with the user data
      // localStorage.setItem('user', JSON.stringify(data));

      return loginData;
    } catch (error) {
      throw error;
    }
  };
  //fetchData of the current user so we can use the data in the profile
  const fetchUserData = () => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/users/current', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
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
         
          // return userData;
        })
        .catch((error) => console.error('Error fetching user data', error));
    }
  };


  const UpdateUserWithProfile = (imageIdGettingFromThePostingImagefunc) => {
    if (imageIdGettingFromThePostingImagefunc) {
      // Send a request to update the user's profile image using PUT method
      fetch("http://localhost:5000/api/users/updateProfileImage", {
        method: "PUT", // Use PUT method
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ imageId: imageIdGettingFromThePostingImagefunc }), // You may not need to send user.id in the request body
      })
        .then(async (response) => {
          if (response.ok) {
            const UpdatedData = await response.json();
            // console.log(data); // Log the entire data object USER 

            // Update the user state with the new data
           await setUser(UpdatedData);

          //  await   setUserWithImage(data);  //this is access nOw 

          //  console.log(data);
          //  console.log(user);
           
           await fetchUserData();
           
          } else {
            throw new Error("Failed to update user with profile image.");
          }
        })
        .catch((error) => {
          console.error("Error updating user profile image:", error);
        });
    } else {
      console.error("Invalid receivedImageId");
    }
  };


  

  useEffect(() => {    
    fetchUserData();
  }, [user]);


  return (
    <UserContext.Provider value={{ user, signUp, login, fetchUserData, UpdateUserWithProfile  }}>
      {children}
    </UserContext.Provider>
  );
}



export default UsersProvider;
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../models/userModel");

const bcrypt = require("bcrypt");

//@description register user 
//@routes Post /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password , profileImage } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ error: "All fields are mandatory" }); // Bad Request
    return;
  }

  // Check if the email is already registered; status code should be 409 for Conflict
  const userAvailable = await userModel.findOne({ email: email });

  if (userAvailable) {
    res.status(404).json({ error: "User Already Registered" });
    return;
  }

  // Hash the password using bcrypt
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    // Create a new user in the database
    const userForDataBase = await userModel.create({
      username: username,
      email,
      password: hashPassword,
      profileImage: profileImage, // Hard-coded default profileImage ID as a string
    });

    if (userForDataBase) {
      // Generate a JWT token for the new user
      const accessToken = jwt.sign(
        {
          user: {
            username: userForDataBase.username,
            email: userForDataBase.email,
            id: userForDataBase._id,
            profileImage: userForDataBase.profileImage, // Include the profileImage field  for showing in the response in frontend
    
          },
        },
        process.env.PRIVATEKEY,
        { expiresIn: "60m" }
      );

      // Send the access token in the response
      res.status(201).json({ accessToken });
    } else {
      res.status(500).json({ error: "User data is not valid" });
    }
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

//@description login user 
//@routes Post /api/users/login
//@access publics
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }
    //compare password with hash password
    //the single password is req.body.pass and the 2nd pass is  the "user.password" the user which we find in the DB  
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
          profileImage: user.profileImage, // Include the profileImage field  for showing in the response in frontend

        },
      },
      process.env.PRIVATEKEY, // This is the secrete key we enter in the "parameter"
      { expiresIn: '60m' } //this is the 3rd thing in "parameter" which is expiry time 
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});



//@description Current user info 
//@routes Post /api/users/current
//@access private

// const currentUser = asyncHandler(async (req, res) => {
//   res.json(req.user) //this req.user is after decoded sof the middleware 

  
//   // res.json({
//   //   _id: req.user._id,
//   //   username: req.user.username,
//   //   email: req.user.email,
//   //   profileImage: req.user.profileImage,
//   // });
// });

const currentUser = asyncHandler(async (req, res) => {
//   res.json(req.user) //this req.user is after decoded sof the middleware 

res.json({
  _id: req.user.id,  //req.user._id  --> req.user.id  
  username: req.user.username,
  email: req.user.email,
  profileImage: req.user.profileImage, // This should already be a string
  
});


});

// const currentUser = asyncHandler(async (req, res) => {
//   const cuser = await User.findById(req.user._id);
//   if (!cuser) { 
//     return res.status(404).json({ error: 'User not found' });
//   }

//   res.json({
//     _id: cuser._id,
//     username: cuser.username,
//     email: cuser.email,
//     profileImage: cuser.profileImage, // Ensure that it's sent as a string
//   });
// });

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const imageId = req.body.imageId;

    // Update the user's profileImage field in the database
    await User.findByIdAndUpdate(userId, { profileImage: imageId });

    // Fetch the user's data after the profile image update
    const updatedUser = await User.findById(userId);

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser); // Include the updated user data in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
};


const updatePassword = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const newPassword = req.body.password;

  // Hash the new password using bcrypt
  const hashPassword = await bcrypt.hash(newPassword, 10);

  try {
    // Update the user's password in the database
    await User.findByIdAndUpdate(userId, { password: hashPassword });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update password' });
  }
});


module.exports = { registerUser, loginUser, currentUser, updateUserProfile ,updatePassword,
};
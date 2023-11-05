const express = require('express');
const {registerUser ,loginUser ,currentUser ,updateUserProfile ,updatePassword} = require('../controller/userController');

const userValidator = require("../middlewares/userValidator") ;

const router = express.Router();

router.post("/register" ,registerUser)
router.post("/login" , loginUser)
router.get("/current" ,userValidator, currentUser)
router.put("/updateProfileImage" ,userValidator, updateUserProfile)
router.put('/updatePassword', userValidator, updatePassword);
module.exports = router;
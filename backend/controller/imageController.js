
const Image = require("../models/imageModel");
const path = require("path"); //for single specific Image
const fs = require('fs'); //for single specific Image
const User = require("../models/userModel");
const { stringify } = require("querystring");

// @Posting  Image using POST 
// http://localhost:5000/api/image/upload
const postingImage = async (req, res) => {
  try {
    // Create an Image model instance.
    const image = new Image({
      name: req.file.originalname,
      contentType: req.file.mimetype,
      imageId: req.file.id,
      user_id: req.user.id,
    });

    // Save the Image model instance to the database.
    const savedImage = await image.save();

    // Set the imageUrl based on your server URL and the image ID
    savedImage.imageUrl = `http://localhost:5000/api/images/${savedImage._id}`;
    //this is for getting the image from the database
    // this is adding the image Id in the user model 
    await User.findByIdAndUpdate(req.user.id, { profileImage: savedImage._id });
    // await User.findByIdAndUpdate(req.user.id, { profileImage: stringify(savedImage._id) });

    // Save the updated Image model
    await savedImage.save();

    res.json(savedImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image upload failed' });
  }
}


// @Posting  note Image using POST 
// http://localhost:5000/api/image/upload/note
const postingNotesImage = async (req, res) => {
  try {
    // Create an Image model instance.
    const image = new Image({
      name: req.file.originalname,
      contentType: req.file.mimetype,
      imageId: req.file.id,
      user_id: req.user.id,
    });

    // Save the Image model instance to the database.
    const savedImage = await image.save();

    // Set the imageUrl based on your server URL and the image ID
    savedImage.imageUrl = `http://localhost:5000/api/images/${savedImage._id}`;
    
    // Save the updated Image model
    await savedImage.save();

    res.json(savedImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image upload failed' });
  }
}


// @Getting  Image using GET
// http://localhost:5000/api/image
const gettingAllImages = async (req, res) => {
  try {
    const images = await Image.find({ user_id: req.user.id }); // Retrieve all image metadata
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve images' });
  }
}


// @Getting Specific Image using GET
// http://localhost:5000/api/images/:id
const singleImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id); //req -> local:Url 
    // await console.log(image.name)
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Construct the path to the image file in the uploads folder based on _id
    // const imagePath = path.join(__dirname, 'uploads', `${req.user._id}-${image.name}`); //"will use when add authentication"
    // const imagePath = path.join(__dirname, 'uploads', `${image.name}`);  //this is disgusting `${}`
    const imagePath = path.join(__dirname, '..', 'uploads', image.name);
    // console.log(imagePath);

    // Check if the file exists
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: 'Image file not found' });
    }

    // Send the image file as a response
    res.sendFile(imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve image' });
  }
}


// @Deletingg Specific Image using DELETE
// http://localhost:5000/api/images/:id
// Define a function to delete an image by its ID
const deleteImage = async (req, res) => {
  try {

    const filteredImage = await Image.findById({ _id: req.params.id });

    if (filteredImage.user_id.toString() !== req.user.id) {
      res.status(403)
      throw new Error("USer not have permission to Delete the Image")
    }

    const imageId = req.params.id;

    // Use Mongoose to find the image by its ID and remove it
    const deletedImage = await Image.findByIdAndRemove(imageId);

    if (!deletedImage) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Construct the path to the image file in the uploads folder
    const imagePath = path.join(__dirname, '..', 'uploads', deletedImage.name);

    // Check if the file exists and delete it from the uploads folder
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};




module.exports = { postingImage, gettingAllImages, singleImage, deleteImage ,postingNotesImage };

//search for file.originalname, file parameters

// Without Template Literals:
// When you use image.name without template literals, you are directly using the name property of the image object. This means that you are getting the actual file name as it exists in the image object.

// With Template Literals (${image.name}):
// When you use ${image.name} within template literals, you are creating a string where ${} is a placeholder for the value of image.name. Template literals are typically used when you want to embed variables or expressions within a string.

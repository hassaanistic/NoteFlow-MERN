const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  contentType: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  imageUrl: String, // Store the image URL here ->// we can fetch the image from databse using this 
  // Add any other fields you need for your image
}); 


// const imageSchema = new mongoose.Schema({
//   name: String,
//   contentType: String,
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
//   imageUrl: String, // You can store the image URL here
//   note_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Note',
//   },
// });
module.exports = mongoose.model('Image', imageSchema);

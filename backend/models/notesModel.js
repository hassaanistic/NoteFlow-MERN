const mongoose = require('mongoose');


const notesSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: String,
  description: String,
  noteImage: {
    type: String,
  }
 
});


// Export the model
module.exports = mongoose.model('Note', notesSchema);

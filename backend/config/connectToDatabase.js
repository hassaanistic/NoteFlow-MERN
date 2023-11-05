const mongoose = require('mongoose');
//import in the server also 

const dbUrl = 'mongodb://127.0.0.1:27017/note_flow' ; // Replace with your MongoDB database URL

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Add event listeners to handle connection and error events
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

module.exports = db;

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerStorage'); // Import the multer middleware
const {postingImage,postingNotesImage ,gettingAllImages ,singleImage ,deleteImage } = require('../controller/imageController'); // Import the image controller
const userValidator = require("../middlewares/userValidator") 


router.use(userValidator);
router.post('/upload', upload.single('image'), postingImage); // Call the imageController.uploadImage function
router.post('/upload/notes', upload.single('image'), postingNotesImage); // Call the imageController.uploadImage function
router.get('/', gettingAllImages); // Call the imageController.uploadImage function
router.route('/:id').get(singleImage).delete(deleteImage)

module.exports = router;

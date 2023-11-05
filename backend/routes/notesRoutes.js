const express = require('express');
const router = express.Router();
const userValidator = require("../middlewares/userValidator") 

const {gettingAllNotes ,postingNote ,updateNote ,deleteNote ,singleNote} = require("../controller/notesController");

router.use(userValidator)
router.route('/').get(gettingAllNotes).post(postingNote)
router.route('/:id').put(updateNote).delete(deleteNote).get(singleNote)



module.exports  = router;
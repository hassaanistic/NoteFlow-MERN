const Note = require("../models/notesModel");

// @Getting all notes using GET 
// localhost:5000/api/notes
const gettingAllNotes = async (req, res) => {
    // res.send("Getting all notes...");
    try {
        const notes = await Note.find({ user_id: req.user.id });
        res.send(notes);

    } catch (e) {
        console.log(e.message)
        throw new Error(e.message);
    }
};


// @Posting  notes using POST 
// localhost:5000/api/notes
const postingNote = async (req, res) => {
    // res.send("Posting your note...");

    const { title, description ,noteImage} = req.body;
    if (!title || !description) {
        res.status(400);
        throw new Error("All fields are required")
    }

    // const {image} = req.body;
    try {

        const note = await Note.create({
            title: title,
            description: description,
            noteImage:noteImage,
            user_id: req.user.id,
        })
        note.save();
        res.status(201).json(note);
        // res.send();

    } catch (e) {
        console.log(e.message)
        throw new Error(e.message);
    }

};


// @Updating  note using PUT
// localhost:5000/api/notes/:id  -> (:id) = 1
const updateNote = async (req, res) => {
    // res.send(`Updating your note with id ${req.params.id} ...`);
    // const { title, description } = req.body;
    try {
        if (!req.params.id) {
            res.send("Invalid parameter");
            throw new Error(e.message);
        }
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, // Provide the '_id' of the note to update
            // { title, description ,user_id}, // Updated fields
            req.body,
            { new: true } // This option returns the updated document
        );

        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.send(updatedNote);

    } catch (e) {
        console.log(e.message);
        throw new Error(e.message);

    }

};


// @Deleting note using DELETE 
// localhost:5000/api/notes/:id  -> (:id) = 1
const deleteNote = async (req, res) => {
    // res.send(`Deleting your note with id ${req.params.id} ...`);
    const filteredNote = await Note.findById({ _id: req.params.id }); //this is _id
    // console.log(filteredNote);

    if (!filteredNote) {
        throw new Error(`Note with id ${req.params.id} is not found`);
    }
    if (filteredNote.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("USer not have permission to Delete the note")
    }

    await Note.deleteOne({ _id: req.params.id });

    // res.send(`Deleting your note with id ${req.params.id}`);
    res.send(filteredNote);
};


// @Getting Single specific note using GET 
// localhost:5000/api/notes/:id  -> (:id) = 1
const singleNote = async (req, res) => {
    // res.send(`Getting your note with id ${req.params.id} ...`);
    const filteredNote = await Note.findById({ _id: req.params.id }); //this is _id

    if (!filteredNote) {
        res.status(404).send(`Note with id ${req.params.id} is not found`);

    }else{   
        res.send(filteredNote);
    }
};

module.exports = { gettingAllNotes, postingNote, updateNote, deleteNote, singleNote };
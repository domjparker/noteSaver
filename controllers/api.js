const express = require("express");
const router = express.Router();
const newDB = require("../db/db");
const { uuid } = require('uuidv4');


// express sets up path and an async function that takes in get request and response parameters.
router.get("/api/notes", async function(req, res) {
    // after the db.json file is read, all notes data from the json file is returned and delivered as a response to front end.
    res.json(await newDB.readNotes());
});

// express sets up path and an async function that takes in post request and response parameters.
router.post("/api/notes", async function(req, res) {
    // body content of the request is assigned to variable newNote
    const newNote = req.body;
    // db.json file is read, after which the data array is assigned to variable currentNotesArray.
    const currentNotesArray = await newDB.readNotes();
    // uuid is added as a key value to newNote
    newNote.id = uuid()
    // new note is combined with current array from db.json file and new db.json file is written with newNote included.
    await newDB.writeNotes([...currentNotesArray, newNote])
    res.json(await newDB.readNotes());
});

// express sets up path and an async function that takes in delete request and response parameters
router.delete("/api/notes/:id", async function(req, res){
//  id of the note request for delete is assigned to variable noteId
    const deleteNoteId =  req.params.id
    // db.json file is read, after which the data array is assigned to variable currentNotesArray.
    const currentNotesArray = await newDB.readNotes();
    // i need to filter the currentNotesArray and make a new array with all objects except that with the noteID
    const amendedArray = currentNotesArray.filter(note => note.id !== deleteNoteId)
    // amended array is written to db.json file, with deleted note excluded.
    await newDB.writeNotes(amendedArray)
    res.json(await newDB.readNotes());
})

module.exports = router
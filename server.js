// Dependencies
const express = require("express");
const fs= require("fs");
const path = require("path");
const util = require("util");
const { uuid } = require('uuidv4');



let app = express()

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// * this will act as my db.js file until modularized later.

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const notesData = "./db/db.json";

class DB{
    async readNotes(){
        try {
            const notesDataRaw = await readFileAsync(notesData,"utf8");
        return notesDataRaw ? JSON.parse(notesDataRaw) : []
        } catch (err) {
        console.log("error when reading note/s in db.json file ", err)
        }
    }
    async writeNotes(notesArray){
        try {
            await writeFileAsync(notesData,JSON.stringify(notesArray))
        } catch (err) {
            console.log("error when writing new db.json file ", err)
        }
    }
};
const newDB = new DB()



// * these are the routes for serving up my html pages - need to be modularized to htmlroutes.js later
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// * these are my data routes for taking and serving data - will be modularized to api.js later
// express sets up path and an async function that takes in request and response parameters.
app.get("/api/notes", async function(req, res) {
    // after the db.json file is read, all notes data from the json file is returned and delivered as a response to front end.
    res.json(await newDB.readNotes());
});

// express sets up path and an async function that takes in request and response parameters.
app.post("/api/notes", async function(req, res) {
    // body content of the request is assigned to variable newNote
    const newNote = req.body;
    // db.json file is read, after which the data array is assigned to variable currentNotesArray.
    const currentNotesArray = await newDB.readNotes();
    // add uuid to newNote
    newNote.id = uuid()
    console.log(newNote)
    await newDB.writeNotes([...currentNotesArray, newNote])
    res.json(newNote)
});

// app.delete("/api/notes/:id", function(req, res){
//    var myId =  req.params.id
// })



app.listen(PORT, function(){
    console.log("Listening on port " + PORT);
})


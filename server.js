// Dependencies
const express = require("express");
const fs= require("fs");
const path = require("path");
const util = require("util");



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
            const notesDataRaw = await readFileAsync(notesData,"utf8")
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

// ----------------------------==========
// const dbJSON = [
//     {
//         "title":"Test Title ONE",
//         "text":"Test text 1"
//     },
//     {
//         "title":"Test Title TWO",
//         "text":"Test text 2"
//     },
// ]


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
    // if currentNotesArray is empty, assign id to newNote
    if(currentNotesArray === []) {
        // newNote.id = 1;
        await newDB.writeNotes([newNote])
        console.log("array was empty")
    } else {
        // if currentNotesArray not empty, read the id of the last object and assign it to a variable.
        const lastObject = currentNotesArray[currentNotesArray.length - 1];
        newNote.id = lastObject.id+1
        // add one to that lastObjectID variable and assign that as an id value to new Note
        console.log(newNote.id)
        // then add newRes into spread (...) of currentNotesArray and write this to db.json.

    }
    res.json(newNote)
});

// app.delete("/api/notes/:id", function(req, res){
//    var myId =  req.params.id
// })



app.listen(PORT, function(){
    console.log("Listening on port " + PORT);
})


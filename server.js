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
//     {
//         "title":"Test Title THREE",
//         "text":"Test text 3"
//     }
// ]


// * these are the routes for serving up my html pages - need to be modularized to htmlroutes.js later
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// * these are my data routes for taking and serving data - will be modularized to api.js later
// Displays all notes
app.get("/api/notes", async function(req, res) {
    res.json(await newDB.readNotes());
});

// saves notes
app.post("/api/notes", function(req, res) {
    const newNote = req.body;
    const currentNotesArray = await newDB.readNotes();
    // if currentNotesArray






//     newNote.id = 
//     dbJSON.push(req.body);
//     res.send("note saved")
});

// app.delete("/api/notes/:id", function(req, res){
//    var myId =  req.params.id
// })








app.listen(PORT, function(){
    console.log("Listening on port " + PORT);
})
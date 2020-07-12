// Dependencies
const express = require("express");
const fs= require("fs");
const path = require("path");
// const util = require("util'");


let app = express()

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// * this will act as my db.json file until modularized later.
const dbJSON = [{title:"Test Title",text:"Test text"}]


// * these are the routes for serving up my html pages - need to be modularized to htmlroutes.js later
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// * these are my data routes for taking and serving data - will be modularized to api.js later
// Displays all notes
app.get("/api/notes", function(req, res) {
    res.json(dbJSON);

// saves notes
// app.post("/api/notes", function(req, res) {
//     return res.json(dbJSON);

// app.delete("/api/notes/:id", function(req, res){
//    var myId =  req.params.id
})








app.listen(PORT, function(){
    console.log("Listening on port " + PORT);
})
// Dependencies
const express = require('express');
// const path = require("path");

// Sets up Express App
const app = express()
const PORT = process.env.PORT || 3000

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// require the html routers from html.js 
const htmlRoutes = require('./controllers/htmlroutes');
app.use(htmlRoutes);

// require the api routers from api.js 
const apiRoutes = require('./controllers/api');
app.use(apiRoutes);


app.listen(PORT, function(){
    console.log("Listening on port " + PORT);
})


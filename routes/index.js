// import Express and note route
const express = require('express');
const notesRouter = require('./notes.js');
// create a new instance of Express application
const app = express();
// mount middleware
app.use('/notes', notesRouter);

// export app module
module.exports = app;
// import api module, express and path package
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
// listening environment PORT or 3001 
const PORT = process.env.PORT || 3001;
// create a new instance of Express application
const app = express();

// mount middleware
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use('/api', api);
app.use(express.static('public'));


// define routes
// root index page
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// main page of the app
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// any other URL will navigate to 404 page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/404.html'))
);

// listening for incoming HTTP requests
app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);
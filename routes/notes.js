// import Express, fs and UUID package
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// get request route
notes.get('/', (req, res) => 
    fs.readFile('./db/db.json', (err, data) => {
        res.json(JSON.parse(data))
    })
);

// writing content into file function
const writeToFile = (destination, content) => 
    fs.writeFile(destination, JSON.stringify(content, null, 3), (err) => 
        err ? console.log(err) : console.info(`\nNotes updated on ${destination}`)    
);

// post request route
notes.post('/', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };
        // read the original data, push the new data then write to a file
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else{
                const parseNote = JSON.parse(data);
                parseNote.push(newNote);
                writeToFile('./db/db.json', parseNote);
            }
        });
        
        // return success message if no error, otherwise return error
        const successResponse = {
            status: 'Adding success!',
            body: newNote,
        };
        res.json(successResponse);
    }else{
        res.json('Error in adding new note');
    }

});

// delete request route
notes.delete('/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else{
            const parseNote = JSON.parse(data);
            // using filter to take out the specific data
            const newNotes = parseNote.filter( note => note.note_id !== id);
            writeToFile('./db/db.json', newNotes);
        }
    });

    res.json('\nDeleting success!');
})

// export module
module.exports = notes;
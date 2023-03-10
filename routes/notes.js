const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

notes.get('/', (req, res) => 
    fs.readFile('./db/db.json', (err, data) => {
        res.json(JSON.parse(data))
    })
);

const writeToFile = (destination, content) => 
    fs.writeFile(destination, JSON.stringify(content, null, 3), (err) => 
        err ? console.log(err) : console.info(`\nNotes updated on ${destination}`)    
);

notes.post('/', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else{
                const parseNote = JSON.parse(data);
                parseNote.push(newNote);
                writeToFile('./db/db.json', parseNote);
            }
        });

        const successResponse = {
            status: 'Adding success!',
            body: newNote,
        };
        res.json(successResponse);
    }else{
        res.json('Error in adding new note');
    }

});

notes.delete('/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else{
            const parseNote = JSON.parse(data);
            const newNotes = parseNote.filter( note => note.note_id !== id);
            writeToFile('./db/db.json', newNotes);
        }
    });

    res.json('\nDeleting success!');
})


module.exports = notes;
const express = require('express');
const path = require('path');
const fs = require('fs');
const generateUniqueId = require('generate-unique-id');
const { readFromFile, readAndAppend } = require('./utils/fsUtils');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request received`);

    // Destructuring assignment for the items in req.body
    const { noteTitile, noteText } = req.body;

    // If all the required properties are present
    if (noteTitile && noteText) {
        // Variable for the object we will save
        const newNote = {
            noteTitile,
            noteText,
            noteId: generateUniqueId(),
        };

        readAndAppend(newNote, './db/db.json');

    } else {
        res.json('Error in posting feedback');
    }
});


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} `)
)
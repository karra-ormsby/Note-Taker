const express = require('express');
const path = require('path');
const fs = require('fs');
const generateUniqueId = require('generate-unique-id');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// app.get('*', (req, res) =>
//     res.sendFile(path.join(__dirname, 'public/index.html'))
// );

// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Get all notes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
                console.error(err);
            } else {
            res.json(JSON.parse(data))
        }
    })
});

//save new note
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

        fs.readFile( './db/db.json', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(newNote);
                stringData = JSON.stringify(parsedData, null, 4);
                fs.writeFile('./db/db.json', stringData, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("Data written to db.json");
                    }
                });
            }
        })

    } else {
        res.json('Error in posting feedback');
    }
});


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} `)
)
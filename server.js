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
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            id: generateUniqueId(),
        };

        fs.readFile( './db/db.json', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                console.log(data);
                const parsedData = JSON.parse(data);
                console.log(parsedData.length);
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
        });

        // const response = {
        //     status: 'success',
        //     body: newNote,
        // };

        // res.json(response);

    } else {
        res.json('Error in adding new note.');
    }
});

// app.delete('/api/notes/:id', (req, res) => {
//     fs.readFile('./db/db.json', (err, data) => {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log(req);
//             // console.log(req.params);
//             console.log(req.params.id);
//             const noteId = req.params.id;
//             console.log(noteId)
//             const parsedData = JSON.parse(data);
//             console.log(parsedData.length);
//             for (let i = 0; i < parsedData.length; i++) {
//                 const currentNote = parsedData[i];
//                 if(currentNote.id === noteId) {
//                     //note found with matching id. Now delete it
//                     console.log("found note id");
//                 }
//             }
//             //fs.write to write the new data (data minus the deleted note)
//         }
//     });
// })



app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} `)
)
const note = require('express').Router();
const fs = require('fs');
const generateUniqueId = require('generate-unique-id');

//Get all saved notes
note.get('/', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(JSON.parse(data))
        }
    })
});


//Save new note
note.post('/', (req, res) => {
    res.json(`${req.method} request received`);
    //Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    //If all the required properties are present then we can save the new note
    if (title && text) {

        //Object to store the new note in
        const newNote = {
            title,
            text,
            id: generateUniqueId(),
        };

        //Reading the saved data from its file
        fs.readFile('./db/db.json', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedData = JSON.parse(data);
                //Adding the new note to the end of the notes
                parsedData.push(newNote);
                const stringData = JSON.stringify(parsedData, null, 4);
                //Re-writting the save file with the newly created data
                fs.writeFile('./db/db.json', stringData, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("Data written to db.json");
                    }
                });
            }
        });
    } else {
        res.json('Error in adding new note.');
    }
});

//Delte specific note, chosen by id
note.delete('/:id', (req, res) => {
    //Reading the saved data from its file
    fs.readFile('./db/db.json', (err, data) => {
        let newNotesArray
        if (err) {
            console.error(err);
        } else {
            const noteId = req.params.id;
            const parsedData = JSON.parse(data);

            //Filter through all the notes in the array. If their ID does not match the one we are searching for, then add it to a new array
            newNotesArray = parsedData.filter((currNote) => {
                return currNote.id != noteId;
            });

            //Re-writting the save file with the newly created array
            fs.writeFile('./db/db.json', JSON.stringify(newNotesArray, null, 4), (err) => {
                if (err) {
                    console.error(err);
                    res.status(400).json(err);
                } else {
                    console.log("Data written to db.json");
                    res.status(200).json(newNotesArray);
                }
            });
        }
    });
});

module.exports = note;
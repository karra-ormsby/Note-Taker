const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.post('/notes', req/res) => {
    
}

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} `)
);
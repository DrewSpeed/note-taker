const router = require('express').Router();
const { notes } = require('../db/db.json')
const fs = require('fs');
const { createNewNote, validateNote } = require('../lib/notes');

router.get('/notes', (req, res) => {
    fs.readFile(__dirname + "/../db/db.json", 'utf8', (error, data) => {
        if (error) {
            return console.log(error);
        }
        console.log("Notes", data);
        res.json(JSON.parse(data));
    } )
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not formatted properly');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
})

module.exports = router;
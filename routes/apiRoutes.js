const router = require('express').Router();
const { notes } = require('../db/db.json')
const fs = require('fs');
const { createNewNote, validateNote, deleteNote } = require('../lib/notes');

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
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not formatted properly');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        const updated = deleteNote(id, notes);
        res.json(updated);
    } else {
        res.send(404);
    }
});

module.exports = router;


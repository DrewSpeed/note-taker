// Dependencies
const router = require('express').Router();
const fs = require('fs');

// route the notes into the /notes page
router.get('/notes', (req, res) => {
    fs.readFile("./db/db.json", (error, data) => {
        if (error) {
            return console.log(error);
        }
        dbData = JSON.parse(data);
        res.send(dbData);
    } )
});

// route for when notes are added
router.post('/notes', (req, res) => {
        const note = req.body;

        fs.readFile("./db/db.json", (err, data) => {
            if (err) throw err;
            noteArray = JSON.parse(data);
            noteArray.push(note);
            let number = 1;
            noteArray.forEach((userNote, index) => {
                userNote.id = number;
                number++;
                return noteArray;
            });

            fs.writeFile("./db/db.json", JSON.stringify(noteArray), (err, data) => {
                if (err) throw err;
            },);
        });
        res.send('Note successfully saved');
    });

// Route for deleting notes
router.delete('/notes/:id', (req, res) => {
         const deleteNote = req.params.id;
 
         fs.readFile('./db/db.json', (err, data) => {
             if (err) throw err;
 
             noteArray = JSON.parse(data);
             for (let i = 0; i < noteArray.length; i++) {
                 if (noteArray[i].id === Number(deleteNote)) {
                     noteArray.splice([i], 1);
                 }
             }
 
             fs.writeFile('./db/db.json', JSON.stringify(noteArray), (err, data) => {
                 if (err) throw err;
             });
         });
         res.status(204).send();
     });

module.exports = router;
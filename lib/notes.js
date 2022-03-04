const fs = require('fs');
const { dirname } = require('path');
const path = require('path');

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
      }
      if (!note.text || typeof note.text !== 'string') {
        return false;
      }
      return true;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
};

function deleteNote(id, notesArray) {
// const deleting = notesArray.filter(note => note.id === id)[0];
delete notesArray[id];
const deleting = notesArray.filter(note => {
    return note === 0 || note
});

fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes: deleting}, null, 2)
);
return notesArray;

}



module.exports = { 
    validateNote,
    createNewNote,
    deleteNote
};
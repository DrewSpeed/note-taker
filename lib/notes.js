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
delete notesArray[id];
const updatedArray = notesArray.filter(note => {
    return note === 0 || note
});

fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes: updatedArray}, null, 2)
);
return updatedArray;

}



module.exports = { 
    validateNote,
    createNewNote,
    deleteNote
};
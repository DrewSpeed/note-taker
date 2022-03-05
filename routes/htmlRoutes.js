//Dependencies
const router = require('express').Router();
const fs = require('fs');
const path = require('path');


// loads the homepage
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// loads the notes page
router.get('/notes', (req, res) => {
     res.sendFile(path.join(__dirname, '../public/notes.html'))
 })

// redirect for other request
router.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
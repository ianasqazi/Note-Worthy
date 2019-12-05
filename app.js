// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require('fs');

var dbFile = require("./public/db/db.json");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));

});


app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// GET : Displays all notes
app.get("/api/notes", function(req, res) {
    
  fs.readFile("public/db/db.json", "utf8", function(err,data) {
      if (err) throw err;
      let allNotes = JSON.parse(data);
      return res.json(allNotes);
    });
 
});

// POST 
// Create New Note - takes in JSON input


/*  POST REQUEST */
app.post('/api/notes', (req, res) => {
  
    fs.readFile('public/db/db.json',(err, data) => {
      if (err) throw err;

      let allNotes = JSON.parse(data);

      let newNote = {
        title: req.body.title,
        text: req.body.text,
      }

      allNotes.push(newNote);
  
      fs.writeFile('public/db/db.json', JSON.stringify(allNotes, null, 2), (err) => {
        if (err) throw err;
        res.send('200');
      });

    });

  });




// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

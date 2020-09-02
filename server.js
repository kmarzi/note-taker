const express = require("express");
const path = require("path");
const dbJson = require("./db/db.json");
const uniqID =require("uniqid");
const fs = require("fs");

const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get("/", function (req, res) {
 res.sendFile(path.join(__dirname, "/public/index.html"));   
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));  
});

app.get("/api/notes", function(req, res){
    res.json(dbJson)
});

app.post("/api/notes", function(req, res){
    const newNote = req.body;
    
    newNote.id = uniqID("");
    
    console.log(newNote.id);
    dbJson.push(newNote);

    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify([...dbJson]), "utf8", function(err){
        if(err) throw err;
        res.json([dbJson])
    })
});

app.delete('api/notes/:id', function (req, res) {
    const id = req.params.id;
    console.log(id);
  });

  app.get("*", function(req, res){
      res.sendFile(path.join(__dirname, index.html));
  });

app.listen(PORT, function() {
     console.log("App listening on PORT " + PORT);
  });



const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.send(notes)
    })

})

app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
        if (err) console.log('readFile error');
        let objectArray = JSON.parse(data);
        objectArray.push(req.body);
        objectArray.forEach((item, i) => {
            item.id = i + 1;
        });
        let newNoteObj = JSON.stringify(objectArray);
        fs.writeFileSync(path.join(__dirname, '/db/db.json'), newNoteObj, (err, result) => {
            if (err) console.log('writefile error')
        });
    })
    res.sendStatus(200)
    res.send(req.body)
})

app.delete('/api/notes/:id', (req, res) => {


    fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
        let objectArray = JSON.parse(data);
        objectArray.forEach((item) => {
            if (item.id == req.params.id) {
                
                objectArray.splice(req.params.id - 1, 1)
            }
            objectArray.forEach((item, i) => {
                item.id = i + 1;
            });

        });
        let newArray = JSON.stringify(objectArray);
        fs.writeFileSync(path.join(__dirname, '/db/db.json'), newArray, (err, result) => {
            if (err) console.log('writefile error')
        });

    })
    
    res.send(req.params.id)

})

app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/index.html"));
  });

  app.listen(PORT, () => { console.log(`Listening on PORT ${PORT}`) })
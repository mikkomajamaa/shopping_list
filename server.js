const express = require('express');
var path = require('path')
var morgan = require('morgan')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static('public'))

let notes = [
  {"id": "asd", "item" : "asd", "additionalNotes": "none"}
];

var Note = require('./models/note');

app.get('/api/notes', (req, res) => {
  Note
    .find({})
    .then(notes => {
      res.json(notes.map(note => note.formatNote))
      notesA = notes
      console.log(notesA.length)
    })
})

app.delete('/api/notes/:id', (request, response) => {
  Note
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/notes', (request, response) => {
  const body = request.body
  const note = new Note({
    item: body.item,
    additionalNotes: body.additionalNotes
  })

  Note
    .find({item: note.item})
    .then(note => {
      if (note.length > 0) {
        ;
      }
    })
    .then(
      note
      .save()
      .then(savedNote => {
        response.json(savedNote.formatNote)
      })
      .catch(error => {
        console.log(error)
}))

  notes = notes.concat(note)

})



/// catch 404 and forwarding to error handler
//app.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});


//Set up mongoose connection
var mongoose = require('mongoose');

var mongoDB = 'mongodb://mongo:27017';

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
app.listen(PORT, HOST);

module.exports = app;

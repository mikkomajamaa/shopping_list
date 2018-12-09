const express = require('express');
var path = require('path')
var morgan = require('morgan')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session');
const auth = require('./routes/auth')


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static('public'))
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

let notes = [
  {"id": "asd", "item" : "asd", "additionalNotes": "none"}
];

var Note = require('./models/note');

app.get('/api/notes/', auth.required, (req, res) => {
  const { payload: { id } } = req;
  Users.findById(id)
    .then((user) => {
      if(user.email) {
        Note
          .find({addedBy: user.email})
          .then(notes => {
            res.json(notes.map(note => note.formatNote))
            notesA = notes
          })

      }
    })

})

app.delete('/api/notes/:id', auth.required, (request, response) => {
  const { payload: { id } } = request;
  Users.findById(id)
    .then((user) => {
      if(user.email) {
        Note
          .findById(request.params.id)
          .then(result => {
            if (result.addedBy == user.email) {
              Note
                .findByIdAndRemove(request.params.id)
                .then(res => {
                  response.status(204).end()})
            }
          })
          .catch(error => {
            response.status(400).send({ error: 'malformatted id' })
          })
      }
    })



})


app.post('/api/notes', auth.required, (request, response) => {
  const body = request.body
  const { payload: { id } } = request;
  Users.findById(id)
    .then((user) => {
      if(user.email) {
        const note = new Note({
          item: body.item,
          additionalNotes: body.additionalNotes,
          addedBy: user.email
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
      }
    })


})



/// catch 404 and forwarding to error handler
//app.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});


//Set up mongoose connection
var mongoose = require('mongoose');

require('./models/Users');
require('./config/passport');
app.use(require('./routes'));

const Users = mongoose.model('Users');

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

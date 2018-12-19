var Note = require('../../models/note');
const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

router.get('/', auth.required, (req, res) => {
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

router.get('/public_notes', (req, res) => {
  let notes = [
    {item : "test_item", additionalNotes: "to_test_the_test"}
  ];
  res.json(notes)
})

router.post('/', auth.required, (request, response) => {
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

router.delete('/:id', auth.required, (request, response) => {
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

module.exports = router;

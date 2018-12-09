const mongoose = require('mongoose')

var Schema = mongoose.Schema;

var noteSchema = new Schema({
  id: String,
  item: String,
  additionalNotes: String,
  addedBy: String
})

noteSchema.virtual('formatNote').get(function () {
  return ({
    id: this._id,
    item: this.item,
    additionalNotes: this.additionalNotes,
    addedBy: this.addedBy
  })
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note

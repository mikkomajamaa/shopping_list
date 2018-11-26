var express = require('express');
var router = express.Router();

var controller = require('../controllers/controller')

/// NOTE ROUTES ///

// GET request for creating Note. NOTE This must come before route for id (i.e. display note).
router.get('/note/create', controller.note_create_get);

// POST request for creating Note.
router.post('/note/create', controller.note_create_post);

// GET request to delete Note.
router.get('/note/:id/delete', controller.note_delete_get);

// POST request to delete Note.
router.post('/note/:id/delete', controller.note_delete_post);

// GET request to update Note.
router.get('/note/:id/update', controller.note_update_get);

// POST request to update Note.
router.post('/note/:id/update', controller.note_update_post);

// GET request for one Note.
router.get('/note/:id', controller.note_detail);

// GET request for list of all Notes.
router.get('/notes', controller.note_list);

module.exports = router;

const { Router } = require('express');

const noteController = require('../controllers/note.controller');

const router = Router();

router.get('/notes', noteController.getAllNotes);

router.get('/notes/:id', noteController.getNote);

router.post('/notes', noteController.addNote);

router.put('/notes/:id', noteController.updateNote);

router.delete('/notes/:id', noteController.deleteNote);

module.exports = router;

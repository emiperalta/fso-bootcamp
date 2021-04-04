const { Router } = require('express');

const noteController = require('../controllers/note.controller');

const router = Router();

router.get('/', noteController.getAllNotes);

router.get('/:id', noteController.getNote);

router.post('/', noteController.addNote);

router.put('/:id', noteController.updateNote);

router.delete('/:id', noteController.deleteNote);

module.exports = router;

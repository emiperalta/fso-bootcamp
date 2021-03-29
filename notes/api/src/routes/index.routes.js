const { Router } = require('express');

const indexController = require('../controllers/index.controller');

const router = Router();

router.get('/notes', indexController.getAllNotes);

module.exports = router;

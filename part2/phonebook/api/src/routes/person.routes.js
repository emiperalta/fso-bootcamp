const { Router } = require('express');

const personController = require('../controllers/person.controller');

const router = Router();

router.get('/api/persons', personController.getPersons);

router.get('/api/persons/:id', personController.getPerson);

router.get('/info', personController.getInfo);

router.post('/api/persons', personController.addPerson);

router.put('/api/persons/:id', personController.updatePerson);

router.delete('/api/persons/:id', personController.deletePerson);

module.exports = router;

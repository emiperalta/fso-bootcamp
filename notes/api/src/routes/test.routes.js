const { Router } = require('express');

const Note = require('../models/Note');
const User = require('../models/User');

const router = Router();

router.post('/reset', async (req, res) => {
  await Note.deleteMany({});
  await User.deleteMany({});

  res.status(204).end();
});

module.exports = router;

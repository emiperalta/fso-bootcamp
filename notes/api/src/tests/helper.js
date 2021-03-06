const supertest = require('supertest');

const app = require('../app');
const User = require('../models/User');

const api = supertest(app);

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: true,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
  },
];

const getNotes = async () => {
  const res = await api.get('/api/notes');
  return {
    contents: res.body.map(r => r.content),
    res,
  };
};

const getUsers = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

module.exports = { api, getNotes, getUsers, initialNotes };

const supertest = require('supertest');

const app = require('../app');

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

module.exports = { api, getNotes, initialNotes };

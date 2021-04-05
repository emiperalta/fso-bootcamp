const mongoose = require('mongoose');

const server = require('../server');
const Note = require('../models/Note');
const { api, initialNotes, getNotes } = require('./helper');

beforeEach(async () => {
  await Note.deleteMany({});
  for (const note of initialNotes) {
    const noteObj = new Note(note);
    await noteObj.save();
  }
});

describe('GET all notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are two notes', async () => {
    const { res } = await getNotes();
    expect(res.body).toHaveLength(initialNotes.length);
  });

  test('a specific note is within the returned notes', async () => {
    const { contents } = await getNotes();
    expect(contents).toContain('HTML is easy');
  });
});

describe('POST new note', () => {
  test('a valid note can be added', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    };

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const { contents, res } = await getNotes();
    expect(res.body).toHaveLength(initialNotes.length + 1);
    expect(contents).toContain(newNote.content);
  });

  test('note without content is not added', async () => {
    const newNote = {
      important: true,
    };

    await api.post('/api/notes').send(newNote).expect(400);

    const { res } = await getNotes();
    expect(res.body).toHaveLength(initialNotes.length);
  });
});

describe('DELETE note', () => {
  test('a note can be deleted', async () => {
    const { res } = await getNotes();
    const noteToDelete = res.body[0];

    await api.delete(`/api/notes/${noteToDelete._id}`).expect(204);

    const { contents, res: secondResponse } = await getNotes();
    expect(secondResponse.body).toHaveLength(initialNotes.length - 1);
    expect(contents).not.toContain(noteToDelete.content);
  });

  test('a note that do not exist can not be deleted', async () => {
    await api.delete('/api/notes/1234567890').expect(400);
    const { res } = await getNotes();
    expect(res.body).toHaveLength(initialNotes.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});

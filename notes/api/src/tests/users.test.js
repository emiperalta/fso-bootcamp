const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const server = require('../server');
const User = require('../models/User');
const { api, getUsers } = require('./helper');

describe('when there is initally one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const hashedPassword = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'root', password: hashedPassword });
    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await getUsers();

    const newUser = {
      username: 'test',
      name: 'test',
      password: 'test',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await getUsers();
    const usernames = usersAtEnd.map(u => u.username);

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    expect(usernames).toContain('test');
  });

  test('creation fails when try to add username that is already saved', async () => {
    const usersAtStart = await getUsers();

    const newUser = {
      username: 'root',
      name: 'rootTest',
      password: 'rootTest',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await getUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
    expect(result.body.error).toContain('User already in use');
  });

  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });
});

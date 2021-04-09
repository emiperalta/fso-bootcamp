const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const server = require('../server');
const User = require('../models/User');
const { api, getUsers } = require('./helper');

describe('POST new user', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const hashedPassword = await bcrypt.hash('secret', 10);
    const user = new User({
      username: 'username test',
      name: 'name test',
      password: hashedPassword,
    });
    await user.save();
  });

  test('with invalid data is not created', async () => {
    const usersAtStart = await getUsers();

    const newUser = {
      username: 'tt',
      name: 'test',
      password: 'tt',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await getUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });
});

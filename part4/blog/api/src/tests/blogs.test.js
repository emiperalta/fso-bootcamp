const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const server = require('../server');
const Blog = require('../models/Blog');
const User = require('../models/User');
const { api, blogs, getBlogs } = require('./helper');

let token;

beforeAll(async () => {
  await User.deleteMany({});
  const hashedPassword = await bcrypt.hash('ghost password', 10);
  const newUser = new User({
    username: 'ghost username',
    name: 'ghost name',
    password: hashedPassword,
  });
  await newUser.save();
  const response = await api
    .post('/api/login')
    .send({ username: 'ghost username', password: 'ghost password' })
    .expect(200);
  token = response.body.token;
});

beforeEach(async () => {
  await Blog.deleteMany({});
  for (const blog of blogs) {
    const blogObj = new Blog(blog);
    await blogObj.save();
  }
});

describe('GET blogs', () => {
  test('return the correct amount of blogs posts in json format', async () => {
    const { response } = await getBlogs();
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });

  test('the unique identifier property of the blog posts is named "_id"', async () => {
    const { ids } = await getBlogs();
    expect(ids).toBeDefined();
  });
});

describe('POST new blog', () => {
  test('a valid blog is added correctly', async () => {
    const newBlog = {
      title: 'title test',
      author: 'author test',
      url: 'url test',
      likes: 2,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const { contents, response } = await getBlogs();
    expect(response.body).toHaveLength(blogs.length + 1);
    expect(contents).toContain(newBlog.title);
  });

  test('without likes property will default to value 0', async () => {
    const newBlog = {
      title: 'title test without likes',
      author: 'author test without likes',
      url: 'url test without likes',
    };

    const savedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const { response } = await getBlogs();
    expect(response.body).toHaveLength(blogs.length + 1);
    expect(savedBlog.body.likes).toBe(0);
  });

  test('without title and url properties respond with 400 Bad Request', async () => {
    const newBlog = {
      author: 'author test without title and url properties',
    };
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });

  test('fails if a token is not provided', async () => {
    const { response: blogsAtStart } = await getBlogs();

    const newBlog = {
      username: 'another ghost username',
      name: 'another ghost name',
      password: 'another ghost password',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const { response: blogsAtEnd } = await getBlogs();

    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length);
  });
});

//at this point, delete tests are not working because the blogs array objects in helper.js have no 'user' property
describe('DELETE blog', () => {
  test('with valid id', async () => {
    const { response: blogsAtStart } = await getBlogs();
    const blogToDelete = blogsAtStart.body[0];

    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const { contents, response: blogsAtEnd } = await getBlogs();
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1);
    expect(contents).not.toContain(blogToDelete.title);
  });

  test('with a non existing id respond with 400 Bad Request', async () => {
    const { response: blogsAtStart } = await getBlogs();

    await api
      .delete('/api/blogs/312312')
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    const { response: blogsAtEnd } = await getBlogs();
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length);
  });
});

describe('UPDATE blog', () => {
  test('with a valid id', async () => {
    const { response } = await getBlogs();
    const blogToUpdate = response.body[0];

    const blogUpdate = {
      title: 'test update',
      author: 'author update',
      url: 'url update',
      likes: 5,
    };

    await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .send(blogUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('with a non existing id respond with 400 Bad Request', async () => {
    await api.put('/api/blogs/1231232').expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});

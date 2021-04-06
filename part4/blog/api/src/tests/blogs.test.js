const mongoose = require('mongoose');

const server = require('../server');
const Blog = require('../models/Blog');
const { api, blogs, getBlogs } = require('./helper');

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
    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

describe('DELETE blog', () => {
  test('with valid id', async () => {
    const { response } = await getBlogs();
    const blogToDelete = response.body[0];

    await api.delete(`/api/blogs/${blogToDelete._id}`).expect(204);

    const { contents, response: secondResponse } = await getBlogs();
    expect(secondResponse.body).toHaveLength(blogs.length - 1);
    expect(contents).not.toContain(blogToDelete.title);
  });

  test('with a non existing id respond with 400 Bad Request', async () => {
    await api.delete('/api/blogs/312312').expect(400);
    const { response } = await getBlogs();
    expect(response.body).toHaveLength(blogs.length);
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

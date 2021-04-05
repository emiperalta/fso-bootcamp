const Blog = require('../models/Blog');

const getAllBlogs = (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs);
  });
};

const addBlog = (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then(result => {
    res.status(201).json(result);
  });
};

module.exports = { getAllBlogs, addBlog };

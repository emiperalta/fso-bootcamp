const Blog = require('../models/Blog');

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
};

const addBlog = async (req, res) => {
  const { body } = req;

  if (!body.title || !body.url)
    return res.status(400).json({ error: 'Title and url must not be empty.' });

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  try {
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const blogUpdated = new Blog({
    _id: id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blogUpdated, { new: true });
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.findByIdAndRemove(id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = { addBlog, deleteBlog, getAllBlogs, updateBlog };

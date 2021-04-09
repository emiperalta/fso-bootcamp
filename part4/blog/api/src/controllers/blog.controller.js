const Blog = require('../models/Blog');

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1 });
  res.json(blogs);
};

const addBlog = async (req, res, next) => {
  const { author, likes, title, url } = req.body;
  const { userFromDB } = req;

  if (!title || !url) {
    return res.status(400).json({ error: 'Title and url must not be empty.' });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: userFromDB._id,
  });

  try {
    const savedBlog = await blog.save();
    userFromDB.blogs = [...userFromDB.blogs, savedBlog._id];
    await userFromDB.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    next(err);
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

const deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  const { userFromDB } = req;
  try {
    const blogFromDB = await Blog.findById(id);

    if (blogFromDB.user.toString() !== userFromDB._id.toString()) {
      return res
        .status(401)
        .json({ error: 'You cannot delete this blog. Wrong credentials.' });
    }

    userFromDB.blogs = userFromDB.blogs.filter(
      blog => blog._id.toString() !== id.toString()
    );
    await userFromDB.save();

    await Blog.findByIdAndRemove(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { addBlog, deleteBlog, getAllBlogs, updateBlog };

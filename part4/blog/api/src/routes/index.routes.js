const { Router } = require('express');

const blogController = require('../controllers/blog.controller');

const router = Router();

router.get('/', blogController.getAllBlogs);

router.post('/', blogController.addBlog);

router.put('/:id', blogController.updateBlog);

router.delete('/:id', blogController.deleteBlog);

module.exports = router;

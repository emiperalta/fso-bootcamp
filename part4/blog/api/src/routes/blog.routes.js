const { Router } = require('express');

const blogController = require('../controllers/blog.controller');
const { userExtractor } = require('../utils/middleware');

const router = Router();

router.get('/', blogController.getAllBlogs);

router.post('/', userExtractor, blogController.addBlog);

router.put('/:id', blogController.updateBlog);

router.delete('/:id', userExtractor, blogController.deleteBlog);

module.exports = router;

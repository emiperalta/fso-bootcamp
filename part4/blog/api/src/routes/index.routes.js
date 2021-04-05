const { Router } = require('express');

const blogController = require('../controllers/blog.controller');

const router = Router();

router.get('/', blogController.getAllBlogs);

router.post('/', blogController.addBlog);

module.exports = router;

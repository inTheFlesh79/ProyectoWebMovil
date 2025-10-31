const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const postController = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');

// uso de operaciones CRUD a través de endpoints RESTful

router.post('/', auth, postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.patch('/:id', postController.patchPost);
router.delete('/:id', postController.deletePost);

module.exports = router;

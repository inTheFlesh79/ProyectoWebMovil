const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/', postController.createPost);       // POST /posts
router.get('/', postController.getPosts);          // GET /posts
router.get('/:id', postController.getPostById);    // GET /posts/:id
router.put('/:id', postController.updatePost);     // PUT /posts/:id
router.patch('/:id', postController.patchPost);    // PATCH /posts/:id
router.delete('/:id', postController.deletePost);  // DELETE /posts/:id
router.patch('/:id/vote', postController.votePost);

module.exports = router;

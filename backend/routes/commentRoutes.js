const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/authMiddleware');

// 🔹 Rutas más específicas primero
router.get('/teacher/:teacherPageId/all', commentController.getCommentsByTeacher);
router.get('/post/:postId', commentController.getCommentsByPostId);

router.post('/', auth, commentController.createComment);           // POST /api/comments
router.get('/', commentController.getComments);              // GET  /api/comments
router.get('/:id', commentController.getCommentById);        // GET  /api/comments/:id
router.put('/:id', commentController.replaceComment);        // PUT  /api/comments/:id
router.patch('/:id', commentController.updateComment);       // PATCH /api/comments/:id
router.delete('/:id', commentController.deleteComment);      // DELETE /api/comments/:id


module.exports = router;

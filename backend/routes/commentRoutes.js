const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.createComment);           // POST /api/comments
router.get('/', commentController.getComments);              // GET  /api/comments
router.get('/:id', commentController.getCommentById);        // GET  /api/comments/:id
router.put('/:id', commentController.replaceComment);        // PUT  /api/comments/:id  (reemplaza)
router.patch('/:id', commentController.updateComment);       // PATCH /api/comments/:id (parcial)
router.delete('/:id', commentController.deleteComment);      // DELETE /api/comments/:id

// opcional: obtener comentarios por teacherPage
router.get('/teacher/:teacherPageId/all', commentController.getCommentsByTeacher);

module.exports = router;

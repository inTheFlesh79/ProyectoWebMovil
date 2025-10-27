const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const postController = require('../controllers/postController');

// Rutas principales
router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.patch('/:id', postController.patchPost);
router.delete('/:id', postController.deletePost);
router.patch('/:id/vote', postController.votePost);

// ✅ Ruta para obtener post por ID (detallado)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT p.*, u.username, u.profilepicture
      FROM post p
      JOIN users u ON p.userid = u.userid
      WHERE p.postid = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener la publicación:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;

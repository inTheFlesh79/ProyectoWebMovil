const Comment = require('../models/commentModel');

const commentController = {
  createComment: async (req, res) => {
    try {
      const comment = await Comment.create(req.body);
      return res.status(201).json(comment);
    } catch (err) {
      console.error('createComment error:', err);
      return res.status(500).json({ error: 'Error creando comment' });
    }
  },

  getComments: async (req, res) => {
    try {
      const comments = await Comment.getAll();
      return res.json(comments);
    } catch (err) {
      console.error('getComments error:', err);
      return res.status(500).json({ error: 'Error obteniendo comentarios' });
    }
  },

  getCommentById: async (req, res) => {
    try {
      const id = req.params.id;
      const comment = await Comment.findById(id);
      if (!comment) return res.status(404).json({ error: 'Comment no encontrado' });
      return res.json(comment);
    } catch (err) {
      console.error('getCommentById error:', err);
      return res.status(500).json({ error: 'Error obteniendo comment' });
    }
  },

  // PUT = reemplazo total (espera todos los campos)
  replaceComment: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const updated = await Comment.replace(id, data);
      if (!updated) return res.status(404).json({ error: 'Comment no encontrado' });
      return res.json(updated);
    } catch (err) {
      console.error('replaceComment error:', err);
      return res.status(500).json({ error: 'Error reemplazando comment' });
    }
  },

  // PATCH = actualización parcial
  updateComment: async (req, res) => {
    try {
      const id = req.params.id;
      const updated = await Comment.update(id, req.body);
      if (!updated) return res.status(404).json({ error: 'Comment no encontrado' });
      return res.json(updated);
    } catch (err) {
      console.error('updateComment error:', err);
      return res.status(500).json({ error: 'Error actualizando comment' });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await Comment.remove(id);
      if (!deleted) return res.status(404).json({ error: 'Comment no encontrado' });
      return res.json({ message: 'Comment eliminado', deleted });
    } catch (err) {
      console.error('deleteComment error:', err);
      return res.status(500).json({ error: 'Error eliminando comment' });
    }
  },

  getCommentsByTeacher: async (req, res) => {
    try {
      const teacherPageId = req.params.teacherPageId;
      const comments = await Comment.findByTeacherPage(teacherPageId);
      return res.json(comments);
    } catch (err) {
      console.error('getCommentsByTeacher error:', err);
      return res.status(500).json({ error: 'Error obteniendo comentarios por teacher' });
    }
  },

  getCommentsByPostId: async (req, res) => {
    try {
      const postId = req.params.postId;
      const comments = await Comment.findByPostId(postId);
      return res.json(comments);
    } catch (err) {
      console.error('getCommentsByPostId error:', err);
      return res.status(500).json({ error: 'Error obteniendo comentarios por post' });
    }
  }
};

module.exports = commentController;
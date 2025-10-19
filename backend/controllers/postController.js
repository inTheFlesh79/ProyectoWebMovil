const Post = require('../models/postModel');

const postController = {
  createPost: async (req, res) => {
    try {
      const post = await Post.create(req.body);
      res.status(201).json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creando post' });
    }
  },

  getPosts: async (req, res) => {
    try {
      const posts = await Post.getAll();
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error obteniendo posts' });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await Post.getById(req.params.id);
      if (!post) return res.status(404).json({ error: 'Post no encontrado' });
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error obteniendo post' });
    }
  },

  updatePost: async (req, res) => {
    try {
      const updatedPost = await Post.update(req.params.id, req.body);
      if (!updatedPost) return res.status(404).json({ error: 'Post no encontrado' });
      res.json(updatedPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error actualizando post' });
    }
  },

  patchPost: async (req, res) => {
    try {
      const patchedPost = await Post.patch(req.params.id, req.body);
      if (!patchedPost) return res.status(404).json({ error: 'Post no encontrado' });
      res.json(patchedPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error actualizando parcialmente el post' });
    }
  },

  deletePost: async (req, res) => {
    try {
      const deleted = await Post.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Post no encontrado' });
      res.json({ message: 'Post eliminado correctamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error eliminando post' });
    }
  }
};

module.exports = postController;

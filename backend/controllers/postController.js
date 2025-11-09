const Post = require('../models/postModel');

const postController = {
  createPost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const userId = req.user.id; // obtenido desde el token JWT

      if (!title || !content) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }

      const post = await Post.create({
        userid: userId,
        title,
        content,
        date: new Date(),
        likes: 0,
        dislikes: 0
      });

      res.status(201).json(post);
    } catch (err) {
      console.error('Error creando post:', err);
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
      const id = req.params.id;
      const post = await Post.getById(id);
      if (!post) {
        return res.status(404).json({ error: 'Post no encontrado' });
      }
      res.json(post);
    } catch (err) {
      console.error('Error obteniendo post:', err);
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
      res.json({ message: 'Post, comentarios y votos eliminados correctamente' });
    } catch (err) {
      console.error('Error eliminando post:', err);
      res.status(500).json({ error: 'Error eliminando post y dependencias' });
    }
  },



};

module.exports = postController;

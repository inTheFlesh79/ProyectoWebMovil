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
      const postId = req.params.id;
      const user = req.user; // { id, role }
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: "Título y contenido son obligatorios" });
      }

      // 1) obtener post original
      const original = await Post.getById(postId);
      if (!original) return res.status(404).json({ error: "Post no encontrado" });

      const isOwner = original.userid === user.id;
      const isAdmin = user.role === 1;

      if (!isOwner && !isAdmin) {
        return res.status(403).json({ error: "No tienes permiso para editar este post" });
      }

      // 2) llamar al modelo para actualizar solo title y content
      const updated = await Post.patch(postId, { title, content });

      res.json(updated);

    } catch (err) {
      console.error("Error en updatePost:", err);
      res.status(500).json({ error: "Error actualizando post" });
    }
  },

  patchPost: async (req, res) => {
    try {
      const postId = req.params.id;
      const user = req.user;
      const { title, content } = req.body;

      // Validar que al menos venga algo
      if (!title && !content) {
        return res.status(400).json({ error: "No hay campos para actualizar" });
      }

      // 1) obtener post original
      const original = await Post.getById(postId);
      if (!original) return res.status(404).json({ error: "Post no encontrado" });

      const isOwner = original.userid === user.id;
      const isAdmin = user.role === 1;

      if (!isOwner && !isAdmin) {
        return res.status(403).json({ error: "No tienes permiso para editar este post" });
      }

      // 2) evitar que se actualicen campos prohibidos
      const safeData = {};
      if (title) safeData.title = title;
      if (content) safeData.content = content;

      const patched = await Post.patch(postId, safeData);

      res.json(patched);

    } catch (err) {
      console.error("Error en patchPost:", err);
      res.status(500).json({ error: "Error actualizando parcialmente el post" });
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

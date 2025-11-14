const User = require('../models/userModel');
const pool = require('../config/db');

const userController = {
  // CREATE
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creando usuario' });
    }
  },

  // GET
  getUsers: async (req, res) => {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error obteniendo usuarios' });
    }
  },

  // GET por id
  getUserById: async (req, res) => {
    try {
      const user = await User.getById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error obteniendo usuario' });
    }
  },

  // UPDATE
  updateUser: async (req, res) => {
    try {
      const updated = await User.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error actualizando usuario' });
    }
  },

  // PATCH
  patchUser: async (req, res) => {
    try {
      const patched = await User.patch(req.params.id, req.body);
      if (!patched) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(patched);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error actualizando parcialmente usuario' });
    }
  },

  // DELETE
  deleteUser: async (req, res) => {
    const client = await pool.connect();
    const userid = req.params.id;

    try {
      await client.query('BEGIN');

      // ELIMINAR VOTOS HECHOS POR EL USUARIO
      await client.query(`DELETE FROM Votes WHERE userid = $1`, [userid]);
      await client.query(`DELETE FROM CommentVotes WHERE userid = $1`, [userid]);
      await client.query(`DELETE FROM ReviewVotes WHERE userid = $1`, [userid]);

      // ELIMINAR VOTOS HECHOS A SUS COMMENTS
      await client.query(`
        DELETE FROM CommentVotes
        WHERE commentid IN (SELECT commentid FROM Comment WHERE userid = $1)
      `, [userid]);

      // ELIMINAR VOTOS HECHOS A SUS REVIEWS
      await client.query(`
        DELETE FROM ReviewVotes
        WHERE reviewid IN (SELECT reviewid FROM Review WHERE userid = $1)
      `, [userid]);

      // ELIMINAR TODAS LAS REVIEWS DEL USUARIO
      await client.query(`DELETE FROM Review WHERE userid = $1`, [userid]);

      // ELIMINAR TODAS LAS CALIFICACIONES TeacherRating DEL USUARIO
      await client.query(`DELETE FROM TeacherRating WHERE userid = $1`, [userid]);

      // ELIMINAR COMMENTS HECHOS POR EL USUARIO
      await client.query(`DELETE FROM Comment WHERE userid = $1`, [userid]);

      // Eliminar votes hacia posts creados por el usuario
      await client.query(`
        DELETE FROM Votes
        WHERE postid IN (SELECT postid FROM Post WHERE userid = $1)
      `, [userid]);

      // Eliminar commentVotes en comments dentro de posts del usuario
      await client.query(`
        DELETE FROM CommentVotes
        WHERE commentid IN (
          SELECT commentid FROM Comment 
          WHERE postid IN (SELECT postid FROM Post WHERE userid = $1)
        )
      `, [userid]);

      // Eliminar comments dentro de posts del usuario
      await client.query(`
        DELETE FROM Comment
        WHERE postid IN (SELECT postid FROM Post WHERE userid = $1)
      `, [userid]);

      // Eliminar posts
      await client.query(`
        DELETE FROM Post
        WHERE userid = $1
      `, [userid]);


      // ELIMINAR AL USUARIO
      const result = await client.query(`
        DELETE FROM Users WHERE userid = $1 RETURNING userid
      `, [userid]);

      await client.query('COMMIT');

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.json({ message: 'Usuario eliminado correctamente' });

    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Error eliminando usuario:', err);
      res.status(500).json({ error: 'Error eliminando usuario' });
    } finally {
      client.release();
    }
  },

  getUserProfile: async (req, res) => {
    try {
      const id = req.params.id;

      // Obtener datos básicos del usuario
      const user = await User.getById(id);
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

      // Obtener comentarios del usuario
      const comments = await User.getUserComments(id);

      // Obtener opiniones del usuario (reviews a profesores)
      const reviews = await User.getUserReviews(id);

      res.json({
        user,
        comments,
        reviews
      });

    } catch (err) {
      console.error('Error obteniendo perfil de usuario:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

};

module.exports = userController;
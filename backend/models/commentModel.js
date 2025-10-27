const pool = require('../config/db');

const Comment = {
  // Crear un nuevo comentario
  create: async (data) => {
    const query = `
      INSERT INTO Comment (
        likes, content, dislikes, date, userid, postId
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      data.likes ?? 0,
      data.content,
      data.dislikes ?? 0,
      data.date ?? new Date().toISOString().slice(0, 10), // YYYY-MM-DD
      data.userid,
      data.postId
    ];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (err) {
      console.error('Error creando comentario:', err);
      throw err;
    }
  },

  // Obtener todos los comentarios
  getAll: async () => {
    try {
      const { rows } = await pool.query('SELECT * FROM Comment ORDER BY date DESC');
      return rows;
    } catch (err) {
      console.error('Error obteniendo comentarios:', err);
      throw err;
    }
  },

  // Buscar comentario por ID
  findById: async (id) => {
    try {
      const { rows } = await pool.query('SELECT * FROM Comment WHERE commentId = $1', [id]);
      return rows[0];
    } catch (err) {
      console.error('Error buscando comentario:', err);
      throw err;
    }
  },

  // Reemplazar todo el registro (PUT)
  replace: async (id, data) => {
    const query = `
      UPDATE Comment SET
        likes = $1,
        content = $2,
        dislikes = $3,
        date = $4,
        userid = $5,
        postId = $6
      WHERE commentId = $7
      RETURNING *;
    `;
    const values = [
      data.likes ?? 0,
      data.content,
      data.dislikes ?? 0,
      data.date ?? new Date().toISOString().slice(0, 10),
      data.userid,
      data.postId,
      id
    ];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (err) {
      console.error('Error actualizando comentario (PUT):', err);
      throw err;
    }
  },

  // Actualización parcial (PATCH)
  update: async (id, data) => {
    const query = `
      UPDATE Comment SET
        likes = COALESCE($1, likes),
        content = COALESCE($2, content),
        dislikes = COALESCE($3, dislikes),
        date = COALESCE($4, date),
        userid = COALESCE($5, userid),
        postId = COALESCE($6, postId)
      WHERE commentId = $7
      RETURNING *;
    `;
    const values = [
      data.likes,
      data.content,
      data.dislikes,
      data.date,
      data.userid,
      data.postId,
      id
    ];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (err) {
      console.error('Error actualizando comentario (PATCH):', err);
      throw err;
    }
  },

  // Eliminar comentario
  remove: async (id) => {
    try {
      const { rows } = await pool.query('DELETE FROM Comment WHERE commentId = $1 RETURNING *', [id]);
      return rows[0];
    } catch (err) {
      console.error('Error eliminando comentario:', err);
      throw err;
    }
  },

  // (Opcional) Buscar comentarios de una página de profesor
  findByTeacherPage: async (teacherPageId) => {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Comment WHERE teacherPageId = $1 ORDER BY date DESC',
        [teacherPageId]
      );
      return rows;
    } catch (err) {
      console.error('Error obteniendo comentarios por teacherPageId:', err);
      throw err;
    }
  },

  findByPostId: async (postId) => {
    try {
      const { rows } = await pool.query(`
        SELECT c.*, u.username, u.profilepicture
        FROM Comment c
        JOIN Users u ON c.userid = u.userid
        WHERE c.postId = $1
        ORDER BY c.date ASC
      `, [postId]);
      return rows;
    } catch (err) {
      console.error('Error obteniendo comentarios por postId:', err);
      throw err;
    }
  }
};

module.exports = Comment;
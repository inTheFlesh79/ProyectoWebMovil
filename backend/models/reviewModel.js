const pool = require('../db');

const Review = {
  // Crear reseña
  create: async (reviewData) => {
    const query = `
      INSERT INTO Review (date, dislikes, likes, content, teacherPageId, userid)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      reviewData.date ?? new Date().toISOString().slice(0, 10), // YYYY-MM-DD si no se envía fecha
      reviewData.dislikes ?? 0,
      reviewData.likes ?? 0,
      reviewData.content,
      reviewData.teacherPageId,
      reviewData.userid
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Error creando review:', err);
      throw err;
    }
  },

  // Obtener todas las reseñas
  getAll: async () => {
    try {
      const result = await pool.query('SELECT * FROM Review ORDER BY date DESC');
      return result.rows;
    } catch (err) {
      console.error('Error obteniendo reviews:', err);
      throw err;
    }
  },

  // Obtener una reseña por ID
  getById: async (reviewId) => {
    try {
      const result = await pool.query('SELECT * FROM Review WHERE reviewId = $1', [reviewId]);
      return result.rows[0];
    } catch (err) {
      console.error('Error obteniendo review por ID:', err);
      throw err;
    }
  },

  // Actualizar reseña completa (PUT)
  update: async (reviewId, data) => {
    const query = `
      UPDATE Review
      SET date = $1, dislikes = $2, likes = $3, content = $4, teacherPageId = $5, userid = $6
      WHERE reviewId = $7
      RETURNING *;
    `;
    const values = [
      data.date ?? new Date().toISOString().slice(0, 10),
      data.dislikes ?? 0,
      data.likes ?? 0,
      data.content,
      data.teacherPageId,
      data.userid,
      reviewId
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Error actualizando review:', err);
      throw err;
    }
  },

  // Actualización parcial (PATCH)
  patch: async (reviewId, fields) => {
    const keys = Object.keys(fields);
    const values = Object.values(fields);

    if (keys.length === 0) return null;

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    const query = `UPDATE Review SET ${setClause} WHERE reviewId = $${keys.length + 1} RETURNING *;`;

    try {
      const result = await pool.query(query, [...values, reviewId]);
      return result.rows[0];
    } catch (err) {
      console.error('Error actualizando parcialmente review:', err);
      throw err;
    }
  },

  // Eliminar reseña
  delete: async (reviewId) => {
    try {
      const result = await pool.query('DELETE FROM Review WHERE reviewId = $1 RETURNING *', [reviewId]);
      return result.rows[0];
    } catch (err) {
      console.error('Error eliminando review:', err);
      throw err;
    }
  }
};

module.exports = Review;
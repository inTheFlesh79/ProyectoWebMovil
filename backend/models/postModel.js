const pool = require('../config/db');

const Post = {
  // Crear un nuevo post
  create: async (postData) => {
    const query = `
      INSERT INTO Post (userid, title, content, date, likes, dislikes)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      postData.userid,
      postData.title,
      postData.content,
      postData.date || new Date(),
      postData.likes || 0,
      postData.dislikes || 0
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Error creando post:', err);
      throw err;
    }
  },

  // Obtener post por ID
  getById: async (id) => {
    const query = `
      SELECT p.*, u.username, u.profilepicture
      FROM post p
      JOIN users u ON p.userid = u.userid
      WHERE p.postid = $1
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  getAll: async () => {
    const { rows } = await pool.query(`
      SELECT p.*, u.username, u.profilepicture
      FROM post p
      JOIN users u ON p.userid = u.userid
      ORDER BY p.postid DESC
    `);
    return rows;
  },

  // Actualizar todo el post (PUT)
  update: async (id, postData) => {
    const query = `
      UPDATE Post
      SET userid = $1, title = $2, content = $3, date = $4, likes = $5, dislikes = $6
      WHERE postId = $7
      RETURNING *;
    `;
    const values = [
      postData.userid,
      postData.title,
      postData.content,
      postData.date,
      postData.likes,
      postData.dislikes,
      id
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Error actualizando post:', err);
      throw err;
    }
  },

  // Actualización parcial (PATCH)
  patch: async (id, postData) => {
    const fields = Object.keys(postData);
    const values = Object.values(postData);
    const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');

    const query = `
      UPDATE Post
      SET ${setClause}
      WHERE postId = $${fields.length + 1}
      RETURNING *;
    `;
    try {
      const result = await pool.query(query, [...values, id]);
      return result.rows[0];
    } catch (err) {
      console.error('Error haciendo patch al post:', err);
      throw err;
    }
  },

  // Eliminar un post
  delete: async (id) => {
    try {
      const result = await pool.query('DELETE FROM Post WHERE postId = $1 RETURNING postId', [id]);
      return result.rowCount > 0;
    } catch (err) {
      console.error('Error eliminando post:', err);
      throw err;
    }
  },

};

module.exports = Post;

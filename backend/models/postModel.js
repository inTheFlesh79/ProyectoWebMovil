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

  // Actualizar todo el post
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

  // PATCH
  patch: async (id, postData) => {
    const allowedFields = ['title', 'content'];
    const fields = Object.keys(postData).filter(f => allowedFields.includes(f));

    if (fields.length === 0) {
      throw new Error("No hay campos válidos para actualizar");
    }

    const values = fields.map(f => postData[f]);
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
      console.error("Error haciendo patch al post:", err);
      throw err;
    }
  },


  // DELETE
  delete: async (id) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Eliminar votos de los comentarios asociados a este post
      await client.query(`
        DELETE FROM CommentVotes
        WHERE commentid IN (
          SELECT commentid FROM Comment WHERE postid = $1
        );
      `, [id]);

      // Eliminar comentarios asociados al post
      await client.query(`
        DELETE FROM Comment WHERE postid = $1;
      `, [id]);

      // Eliminar votos del post
      await client.query(`
        DELETE FROM Votes WHERE postid = $1;
      `, [id]);

      // Eliminar el post
      const result = await client.query(`
        DELETE FROM Post WHERE postid = $1 RETURNING postid;
      `, [id]);

      await client.query('COMMIT');
      return result.rowCount > 0;
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Error eliminando post en cascada:', err);
      throw err;
    } finally {
      client.release();
    }
  },



};

module.exports = Post;

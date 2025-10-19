const pool = require('../db');

const EduTea = {
  create: async (data) => {
    const query = `
      INSERT INTO eduTea (eduId, teacherPageId)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [data.eduId, data.teacherPageId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  getAll: async () => {
    const { rows } = await pool.query('SELECT * FROM eduTea ORDER BY eduId, teacherPageId');
    return rows;
  },

  findByEduId: async (eduId) => {
    const { rows } = await pool.query('SELECT * FROM eduTea WHERE eduId = $1 ORDER BY teacherPageId', [eduId]);
    return rows;
  },

  findByTeacherId: async (teacherPageId) => {
    const { rows } = await pool.query('SELECT * FROM eduTea WHERE teacherPageId = $1 ORDER BY eduId', [teacherPageId]);
    return rows;
  },

  findByComposite: async (eduId, teacherPageId) => {
    const { rows } = await pool.query(
      'SELECT * FROM eduTea WHERE eduId = $1 AND teacherPageId = $2',
      [eduId, teacherPageId]
    );
    return rows[0];
  },

  // Reemplaza la relación: borra la existente e inserta la nueva dentro de una transacción
  replace: async (eduId, teacherPageId, { newEduId, newTeacherPageId }) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Verificar existencia
      const { rows: found } = await client.query(
        'SELECT * FROM eduTea WHERE eduId = $1 AND teacherPageId = $2',
        [eduId, teacherPageId]
      );
      if (!found.length) {
        await client.query('ROLLBACK');
        return null;
      }

      // Delete old
      await client.query('DELETE FROM eduTea WHERE eduId = $1 AND teacherPageId = $2', [eduId, teacherPageId]);

      // Insert new (si coincide con los mismos valores, se insertará de nuevo)
      const insertRes = await client.query(
        'INSERT INTO eduTea (eduId, teacherPageId) VALUES ($1, $2) RETURNING *',
        [newEduId, newTeacherPageId]
      );

      await client.query('COMMIT');
      return insertRes.rows[0];
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },

  remove: async (eduId, teacherPageId) => {
    const { rows } = await pool.query(
      'DELETE FROM eduTea WHERE eduId = $1 AND teacherPageId = $2 RETURNING *',
      [eduId, teacherPageId]
    );
    return rows[0];
  }
};

module.exports = EduTea;
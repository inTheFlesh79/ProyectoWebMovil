const pool = require('../db');

const TeacherPage = {
  create: async (data) => {
    // Se espera teacherPageId provisto por el cliente
    const query = `
      INSERT INTO TeacherPage (
        name, content, profilePicture
      ) VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [
      data.name,
      data.content,
      data.profilePicture ? Buffer.from(data.profilePicture, 'base64') : null
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  getAll: async () => {
    const { rows } = await pool.query('SELECT teacherpageid, name, content FROM TeacherPage ORDER BY name');
    return rows;
  },

  findById: async (id) => {
    const { rows } = await pool.query('SELECT * FROM TeacherPage WHERE teacherPageId = $1', [id]);
    return rows[0];
  },

  // Reemplazo total (PUT)
  replace: async (id, data) => {
    const query = `
      UPDATE TeacherPage SET
        name = $1,
        content = $2,
        profilePicture = $3
      WHERE teacherPageId = $4
      RETURNING *;
    `;
    const values = [
      data.name,
      data.content,
      data.profilePicture ? Buffer.from(data.profilePicture, 'base64') : null,
      id
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // PATCH (parcial)
  update: async (id, data) => {
    const query = `
      UPDATE TeacherPage SET
        name = COALESCE($1, name),
        content = COALESCE($2, content),
        profilePicture = COALESCE($3, profilePicture)
      WHERE teacherPageId = $4
      RETURNING *;
    `;
    const values = [
      data.name,
      data.content,
      data.profilePicture ? Buffer.from(data.profilePicture, 'base64') : null,
      id
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  remove: async (id) => {
    const { rows } = await pool.query('DELETE FROM TeacherPage WHERE teacherPageId = $1 RETURNING *', [id]);
    return rows[0];
  },

  searchByName: async (term) => {
    const query = `
      SELECT * FROM TeacherPage
      WHERE LOWER(name) LIKE $1
      ORDER BY name ASC;
    `;
    const { rows } = await pool.query(query, [`%${term}%`]);
    return rows;
  }

};

module.exports = TeacherPage;

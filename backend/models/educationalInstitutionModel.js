const pool = require('../db');

const EducationalInstitution = {
  create: async (data) => {
    const query = `
      INSERT INTO EducationalInstitution (eduName, address)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [data.eduName, data.address];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  getAll: async () => {
    const { rows } = await pool.query('SELECT * FROM EducationalInstitution ORDER BY eduId');
    return rows;
  },

  findById: async (id) => {
    const { rows } = await pool.query('SELECT * FROM EducationalInstitution WHERE eduId = $1', [id]);
    return rows[0];
  },

  // Reemplazo total (PUT)
  replace: async (id, data) => {
    const query = `
      UPDATE EducationalInstitution SET
        eduName = $1,
        address = $2
      WHERE eduId = $3
      RETURNING *;
    `;
    const values = [data.eduName, data.address, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // PATCH parcial
  update: async (id, data) => {
    const query = `
      UPDATE EducationalInstitution SET
        eduName = COALESCE($1, eduName),
        address = COALESCE($2, address)
      WHERE eduId = $3
      RETURNING *;
    `;
    const values = [data.eduName, data.address, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  remove: async (id) => {
    const { rows } = await pool.query('DELETE FROM EducationalInstitution WHERE eduId = $1 RETURNING *', [id]);
    return rows[0];
  }
};

module.exports = EducationalInstitution;
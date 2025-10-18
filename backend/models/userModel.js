const pool = require('../db');

const User = {
  // Crear un usuario dinámico desde JSON
  create: async (userData) => {
    const query = `
      INSERT INTO Users (
        password, username, role, correo, rut, region, district, isMember, profilePicture
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *;
    `;
    const values = [
      userData.password,
      userData.username,
      userData.role,
      userData.correo,
      userData.rut,
      userData.region,
      userData.district,
      userData.isMember,
      userData.profilePicture
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Error creando usuario:', err);
      throw err;
    }
  },

  // Obtener todos los usuarios
  getAll: async () => {
    try {
      const result = await pool.query('SELECT * FROM Users');
      return result.rows;
    } catch (err) {
      console.error('Error obteniendo usuarios:', err);
      throw err;
    }
  },

  // Buscar usuario por correo
  findByEmail: async (correo) => {
    try {
      const result = await pool.query('SELECT * FROM Users WHERE correo = $1', [correo]);
      return result.rows[0];
    } catch (err) {
      console.error('Error buscando usuario por correo:', err);
      throw err;
    }
  }
};

module.exports = User;
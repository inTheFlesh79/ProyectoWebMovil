const pool = require('../config/db');

const User = {
  // Crear un usuario
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
      userData.role,          // número entero
      userData.correo,
      userData.rut,
      userData.region,
      userData.district,
      userData.isMember,
      userData.profilePicture // opcional: base64 o null
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
  },

  // Buscar por ID (userid)
  getById: async (userid) => {
    try {
      const result = await pool.query('SELECT * FROM Users WHERE userid = $1', [userid]);
      return result.rows[0];
    } catch (err) {
      console.error('Error obteniendo usuario por ID:', err);
      throw err;
    }
  },

  // Actualizar usuario completo (PUT)
  update: async (userid, data) => {
  try {
    const query = `
      UPDATE Users
      SET password=$1, username=$2, role=$3, correo=$4, rut=$5,
          region=$6, district=$7, isMember=$8, profilePicture=$9
      WHERE userid=$10
      RETURNING *;
    `;
    const values = [
      data.password,
      data.username,
      data.role,
      data.correo,
      data.rut,
      data.region,
      data.district,
      data.isMember,
      data.profilePicture,
      userid
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error('Error actualizando usuario:', err);
    throw err;
  }
},


  // Actualizar parcialmente (PATCH)
  patch: async (userid, data) => {
  try {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key, i) => `${key}=$${i + 1}`).join(', ');
    const query = `UPDATE Users SET ${setClause} WHERE userid=$${keys.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, userid]);
    return result.rows[0];
  } catch (err) {
    console.error('Error actualizando parcialmente usuario:', err);
    throw err;
  }
},


  // Eliminar usuario
  delete: async (userid) => {
    try {
      const result = await pool.query('DELETE FROM Users WHERE userid=$1 RETURNING userid', [userid]);
      return result.rowCount > 0;
    } catch (err) {
      console.error('Error eliminando usuario:', err);
      throw err;
    }
  },

  // Comentarios realizados por el usuario
getUserComments: async (userid) => {
  try {
    const query = `
      SELECT c.commentid, c.content, c.date, c.likes, c.dislikes, c.postid
      FROM comment c
      WHERE c.userid = $1
      ORDER BY c.date DESC;
    `;
    const { rows } = await pool.query(query, [userid]);
    return rows;
  } catch (err) {
    console.error('Error obteniendo comentarios del usuario:', err);
    throw err;
  }
},

// Opiniones (reviews) realizadas por el usuario
getUserReviews: async (userid) => {
  try {
    const query = `
      SELECT r.reviewid, r.content, r.date, r.likes, r.dislikes, t.name AS teachername
      FROM review r
      JOIN teacherpage t ON r.teacherpageid = t.teacherpageid
      WHERE r.userid = $1
      ORDER BY r.date DESC;
    `;
    const { rows } = await pool.query(query, [userid]);
    return rows;
  } catch (err) {
    console.error('Error obteniendo opiniones del usuario:', err);
    throw err;
  }
},

};

module.exports = User;
const pool = require('../db');

const TeacherRating = {
  create: async (data) => {
    const query = `
      INSERT INTO TeacherRating (
        teachingPoliteness, teachingQuality, teachingDifficulty, userid, teacherPageId
      ) VALUES ($1,$2,$3,$4,$5)
      RETURNING *;
    `;
    const values = [
      data.teachingPoliteness,
      data.teachingQuality,
      data.teachingDifficulty,
      data.userid,
      data.teacherPageId
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  getAll: async () => {
    const { rows } = await pool.query('SELECT * FROM TeacherRating ORDER BY ratingId');
    return rows;
  },

  findById: async (id) => {
    const { rows } = await pool.query('SELECT * FROM TeacherRating WHERE ratingId = $1', [id]);
    return rows[0];
  },

  // Reemplazo total (PUT)
  replace: async (id, data) => {
    const query = `
      UPDATE TeacherRating SET
        teachingPoliteness = $1,
        teachingQuality = $2,
        teachingDifficulty = $3,
        userid = $4,
        teacherPageId = $5
      WHERE ratingId = $6
      RETURNING *;
    `;
    const values = [
      data.teachingPoliteness,
      data.teachingQuality,
      data.teachingDifficulty,
      data.userid,
      data.teacherPageId,
      id
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // PATCH parcial
  update: async (id, data) => {
    const query = `
      UPDATE TeacherRating SET
        teachingPoliteness = COALESCE($1, teachingPoliteness),
        teachingQuality = COALESCE($2, teachingQuality),
        teachingDifficulty = COALESCE($3, teachingDifficulty),
        userid = COALESCE($4, userid),
        teacherPageId = COALESCE($5, teacherPageId)
      WHERE ratingId = $6
      RETURNING *;
    `;
    const values = [
      data.teachingPoliteness,
      data.teachingQuality,
      data.teachingDifficulty,
      data.userid,
      data.teacherPageId,
      id
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  remove: async (id) => {
    const { rows } = await pool.query('DELETE FROM TeacherRating WHERE ratingId = $1 RETURNING *', [id]);
    return rows[0];
  },

  findByTeacherPage: async (teacherPageId) => {
    const { rows } = await pool.query('SELECT * FROM TeacherRating WHERE teacherPageId = $1 ORDER BY ratingId', [teacherPageId]);
    return rows;
  },

  getAverageByTeacher: async (teacherPageId) => {
    const query = `
      SELECT
        AVG(teachingPoliteness) AS avg_politeness,
        AVG(teachingQuality) AS avg_quality,
        AVG(teachingDifficulty) AS avg_difficulty,
        COUNT(*) AS totalRatings
      FROM TeacherRating
      WHERE teacherPageId = $1;
    `;
    const { rows } = await pool.query(query, [teacherPageId]);
    return rows[0];
  }
};

module.exports = TeacherRating;

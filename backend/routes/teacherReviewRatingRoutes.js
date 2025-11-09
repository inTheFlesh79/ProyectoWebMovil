const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const pool = require('../config/db');


router.delete('/:teacherPageId', auth, async (req, res) => {
  const teacherPageId = Number(req.params.teacherPageId);
  const userId = req.user.id;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1) obtener reviewid(s) del usuario para ese teacher (normalmente 1)
    const { rows: revRows } = await client.query(
      'SELECT reviewid FROM Review WHERE teacherPageId = $1 AND userid = $2',
      [teacherPageId, userId]
    );

    if (revRows.length) {
      const reviewIds = revRows.map(r => r.reviewid);

      // 2) borrar votos asociados a esas reviews
      await client.query(
        'DELETE FROM ReviewVotes WHERE reviewid = ANY($1::bigint[])',
        [reviewIds]
      );

      // 3) borrar reviews
      await client.query(
        'DELETE FROM Review WHERE teacherPageId = $1 AND userid = $2',
        [teacherPageId, userId]
      );
    }

    // 4) borrar rating del usuario para ese teacher
    await client.query(
      'DELETE FROM TeacherRating WHERE teacherPageId = $1 AND userid = $2',
      [teacherPageId, userId]
    );

    await client.query('COMMIT');
    return res.json({ success: true });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('delete teacher feedback error:', err);
    return res.status(500).json({ error: 'Error eliminando calificación y reseña' });
  } finally {
    client.release();
  }
});

module.exports = router;
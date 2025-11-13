const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const pool = require('../config/db');

router.delete('/review/:reviewId', auth, async (req, res) => {
  const reviewId = Number(req.params.reviewId);
  const currentUserId = Number(req.user.id);
  const currentRole = Number(req.user.role);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Obtener review
    const { rows } = await client.query(
      'SELECT teacherpageid, userid FROM Review WHERE reviewid = $1',
      [reviewId]
    );

    if (!rows.length) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: 'Review no encontrada' });
    }

    const review = rows[0];

    // 🔥 Normalizamos valores
    const ownerId = Number(review.userid);

    // 🔐 Permitido si: dueño o admin
    if (currentUserId !== ownerId && currentRole !== 1) {
      await client.query("ROLLBACK");
      return res.status(403).json({ error: 'No autorizado' });
    }

    // 1. Borrar votos
    await client.query('DELETE FROM ReviewVotes WHERE reviewid = $1', [reviewId]);

    // 2. Borrar review
    await client.query('DELETE FROM Review WHERE reviewid = $1', [reviewId]);

    // 3. Borrar rating del mismo usuario en ese teacher
    await client.query(
      'DELETE FROM TeacherRating WHERE teacherpageid = $1 AND userid = $2',
      [review.teacherpageid, ownerId]
    );

    await client.query("COMMIT");
    return res.json({ success: true });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error eliminando review:", err);
    return res.status(500).json({ error: "Error eliminando review y rating" });
  } finally {
    client.release();
  }
});

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
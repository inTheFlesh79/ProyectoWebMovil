const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/authMiddleware');

// uso de operaciones CRUD a través de endpoints RESTful

router.post('/', auth, reviewController.createReview);
router.get('/', reviewController.getReviews);
router.get('/:id', reviewController.getReviewById);
router.put('/:id', reviewController.updateReview);
router.patch('/:id', reviewController.patchReview);
router.delete('/:id', reviewController.deleteReview);
router.get('/check/:teacherPageId/:userId', reviewController.checkUserReview);
router.get('/check/:teacherPageId/:userId', async (req, res) => {
  try {
    const { teacherPageId, userId } = req.params;
    const pool = require('../config/db');
    const { rows } = await pool.query(
      'SELECT 1 FROM Review WHERE teacherPageId = $1 AND userid = $2 LIMIT 1',
      [teacherPageId, userId]
    );
    res.json({ exists: rows.length > 0 });
  } catch (err) {
    console.error('Error en reviews/check:', err);
    res.status(500).json({ error: 'Error verificando review' });
  }
});

router.get('/teacher/:teacherPageId', async (req, res) => {
  try {
    const teacherPageId = req.params.teacherPageId;
    const reviews = await require('../models/reviewModel').getByTeacherPage(teacherPageId);
    res.json(reviews);
  } catch (err) {
    console.error('Error obteniendo reviews del profesor:', err);
    res.status(500).json({ error: 'Error obteniendo reviews del profesor' });
  }
});

module.exports = router;

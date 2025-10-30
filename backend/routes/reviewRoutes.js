const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Endpoints básicos CRUD
router.post('/', reviewController.createReview);
router.get('/', reviewController.getReviews);
router.get('/:id', reviewController.getReviewById);
router.put('/:id', reviewController.updateReview);
router.patch('/:id', reviewController.patchReview);
router.delete('/:id', reviewController.deleteReview);
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

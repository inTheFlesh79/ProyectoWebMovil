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

module.exports = router;

const Review = require('../models/reviewModel');

const reviewController = {
  createReview: async (req, res) => {
    try {
      const newReview = await Review.create(req.body);
      res.status(201).json(newReview);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creando review' });
    }
  },

  getReviews: async (req, res) => {
    try {
      const reviews = await Review.getAll();
      res.json(reviews);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error obteniendo reviews' });
    }
  },

  getReviewById: async (req, res) => {
    try {
      const review = await Review.getById(req.params.id);
      if (!review) return res.status(404).json({ error: 'Review no encontrada' });
      res.json(review);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error obteniendo review' });
    }
  },

  updateReview: async (req, res) => {
    try {
      const updated = await Review.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error actualizando review' });
    }
  },

  patchReview: async (req, res) => {
    try {
      const patched = await Review.patch(req.params.id, req.body);
      res.json(patched);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error actualizando parcialmente review' });
    }
  },

  deleteReview: async (req, res) => {
    try {
      const result = await Review.delete(req.params.id);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error eliminando review' });
    }
  },

  checkUserReview: async (req, res) => {
    try {
      const { teacherPageId, userId } = req.params;
      const existing = await Review.getByTeacherAndUser(teacherPageId, userId);
      res.json({ exists: !!existing });
    } catch (err) {
      console.error('Error verificando reseña del usuario:', err);
      res.status(500).json({ error: 'Error verificando reseña del usuario' });
    }
  }
};

module.exports = reviewController;

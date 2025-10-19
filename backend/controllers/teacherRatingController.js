const TeacherRating = require('../models/teacherRatingModel');

const teacherRatingController = {
  createRating: async (req, res) => {
    try {
      const rating = await TeacherRating.create(req.body);
      return res.status(201).json(rating);
    } catch (err) {
      console.error('createRating error:', err);
      return res.status(500).json({ error: 'Error creando rating' });
    }
  },

  getRatings: async (req, res) => {
    try {
      const ratings = await TeacherRating.getAll();
      return res.json(ratings);
    } catch (err) {
      console.error('getRatings error:', err);
      return res.status(500).json({ error: 'Error obteniendo ratings' });
    }
  },

  getRatingById: async (req, res) => {
    try {
      const id = req.params.id;
      const rating = await TeacherRating.findById(id);
      if (!rating) return res.status(404).json({ error: 'Rating no encontrado' });
      return res.json(rating);
    } catch (err) {
      console.error('getRatingById error:', err);
      return res.status(500).json({ error: 'Error obteniendo rating' });
    }
  },

  replaceRating: async (req, res) => {
    try {
      const id = req.params.id;
      const updated = await TeacherRating.replace(id, req.body);
      if (!updated) return res.status(404).json({ error: 'Rating no encontrado' });
      return res.json(updated);
    } catch (err) {
      console.error('replaceRating error:', err);
      return res.status(500).json({ error: 'Error reemplazando rating' });
    }
  },

  updateRating: async (req, res) => {
    try {
      const id = req.params.id;
      const updated = await TeacherRating.update(id, req.body);
      if (!updated) return res.status(404).json({ error: 'Rating no encontrado' });
      return res.json(updated);
    } catch (err) {
      console.error('updateRating error:', err);
      return res.status(500).json({ error: 'Error actualizando rating' });
    }
  },

  deleteRating: async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await TeacherRating.remove(id);
      if (!deleted) return res.status(404).json({ error: 'Rating no encontrado' });
      return res.json({ message: 'Rating eliminado', deleted });
    } catch (err) {
      console.error('deleteRating error:', err);
      return res.status(500).json({ error: 'Error eliminando rating' });
    }
  },

  getRatingsByTeacher: async (req, res) => {
    try {
      const teacherPageId = req.params.teacherPageId;
      const ratings = await TeacherRating.findByTeacherPage(teacherPageId);
      return res.json(ratings);
    } catch (err) {
      console.error('getRatingsByTeacher error:', err);
      return res.status(500).json({ error: 'Error obteniendo ratings por teacher' });
    }
  },

  getAverageByTeacher: async (req, res) => {
    try {
      const teacherPageId = req.params.teacherPageId;
      const avg = await TeacherRating.getAverageByTeacher(teacherPageId);
      return res.json(avg);
    } catch (err) {
      console.error('getAverageByTeacher error:', err);
      return res.status(500).json({ error: 'Error calculando promedio' });
    }
  }
};

module.exports = teacherRatingController;

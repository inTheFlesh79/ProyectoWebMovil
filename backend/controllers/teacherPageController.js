const TeacherPage = require('../models/teacherPageModel');

const teacherPageController = {
  createTeacherPage: async (req, res) => {
    try {
      const page = await TeacherPage.create(req.body);
      return res.status(201).json(page);
    } catch (err) {
      console.error('createTeacherPage error:', err);
      return res.status(500).json({ error: 'Error creando teacher page' });
    }
  },

  getTeacherPages: async (req, res) => {
    try {
      const pages = await TeacherPage.getAll();
      return res.json(pages);
    } catch (err) {
      console.error('getTeacherPages error:', err);
      return res.status(500).json({ error: 'Error obteniendo teacher pages' });
    }
  },

  getTeacherPageById: async (req, res) => {
    try {
      const id = req.params.id;
      const page = await TeacherPage.findById(id);
      if (!page) return res.status(404).json({ error: 'TeacherPage no encontrado' });
      return res.json(page);
    } catch (err) {
      console.error('getTeacherPageById error:', err);
      return res.status(500).json({ error: 'Error obteniendo teacher page' });
    }
  },

  replaceTeacherPage: async (req, res) => {
    try {
      const id = req.params.id;
      const updated = await TeacherPage.replace(id, req.body);
      if (!updated) return res.status(404).json({ error: 'TeacherPage no encontrado' });
      return res.json(updated);
    } catch (err) {
      console.error('replaceTeacherPage error:', err);
      return res.status(500).json({ error: 'Error reemplazando teacher page' });
    }
  },

  updateTeacherPage: async (req, res) => {
    try {
      const id = req.params.id;
      const updated = await TeacherPage.update(id, req.body);
      if (!updated) return res.status(404).json({ error: 'TeacherPage no encontrado' });
      return res.json(updated);
    } catch (err) {
      console.error('updateTeacherPage error:', err);
      return res.status(500).json({ error: 'Error actualizando teacher page' });
    }
  },

  deleteTeacherPage: async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await TeacherPage.remove(id);
      if (!deleted) return res.status(404).json({ error: 'TeacherPage no encontrado' });
      return res.json({ message: 'TeacherPage eliminado', deleted });
    } catch (err) {
      console.error('deleteTeacherPage error:', err);
      return res.status(500).json({ error: 'Error eliminando teacher page' });
    }
  }
};

module.exports = teacherPageController;

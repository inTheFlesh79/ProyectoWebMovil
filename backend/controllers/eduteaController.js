const EduTea = require('../models/eduteaModel');

const eduteaController = {
  createLink: async (req, res) => {
    try {
      const link = await EduTea.create(req.body);
      return res.status(201).json(link);
    } catch (err) {
      console.error('createLink error:', err);
      return res.status(500).json({ error: 'Error creando relación edu-teacher' });
    }
  },

  getAllLinks: async (req, res) => {
    try {
      const rows = await EduTea.getAll();
      return res.json(rows);
    } catch (err) {
      console.error('getAllLinks error:', err);
      return res.status(500).json({ error: 'Error obteniendo relaciones' });
    }
  },

  getLinksByEdu: async (req, res) => {
    try {
      const eduId = req.params.eduId;
      const rows = await EduTea.findByEduId(eduId);
      return res.json(rows);
    } catch (err) {
      console.error('getLinksByEdu error:', err);
      return res.status(500).json({ error: 'Error obteniendo relaciones por institución' });
    }
  },

  getLinksByTeacher: async (req, res) => {
    try {
      const teacherPageId = req.params.teacherPageId;
      const rows = await EduTea.findByTeacherId(teacherPageId);
      return res.json(rows);
    } catch (err) {
      console.error('getLinksByTeacher error:', err);
      return res.status(500).json({ error: 'Error obteniendo relaciones por teacher' });
    }
  },

  getLinkByComposite: async (req, res) => {
    try {
      const { eduId, teacherPageId } = req.params;
      const link = await EduTea.findByComposite(eduId, teacherPageId);
      if (!link) return res.status(404).json({ error: 'Relación no encontrada' });
      return res.json(link);
    } catch (err) {
      console.error('getLinkByComposite error:', err);
      return res.status(500).json({ error: 'Error obteniendo relación' });
    }
  },

  replaceLink: async (req, res) => {
    try {
      const { eduId, teacherPageId } = req.params;
      const { newEduId, newTeacherPageId } = req.body;
      const replaced = await EduTea.replace(eduId, teacherPageId, { newEduId, newTeacherPageId });
      if (!replaced) return res.status(404).json({ error: 'Relación original no encontrada' });
      return res.json(replaced);
    } catch (err) {
      console.error('replaceLink error:', err);
      return res.status(500).json({ error: 'Error reemplazando relación' });
    }
  },

  // PATCH 
  updateLink: async (req, res) => {
    try {
      const { eduId, teacherPageId } = req.params;
      const { newEduId = eduId, newTeacherPageId = teacherPageId } = req.body;
      const updated = await EduTea.replace(eduId, teacherPageId, { newEduId, newTeacherPageId });
      if (!updated) return res.status(404).json({ error: 'Relación original no encontrada' });
      return res.json(updated);
    } catch (err) {
      console.error('updateLink error:', err);
      return res.status(500).json({ error: 'Error actualizando relación' });
    }
  },

  // DELETE
  deleteLink: async (req, res) => {
    try {
      const { eduId, teacherPageId } = req.params;
      const deleted = await EduTea.remove(eduId, teacherPageId);
      if (!deleted) return res.status(404).json({ error: 'Relación no encontrada' });
      return res.json({ message: 'Relación eliminada', deleted });
    } catch (err) {
      console.error('deleteLink error:', err);
      return res.status(500).json({ error: 'Error eliminando relación' });
    }
  }
};

module.exports = eduteaController;
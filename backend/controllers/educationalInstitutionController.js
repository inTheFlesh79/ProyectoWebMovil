const EducationalInstitution = require('../models/educationalInstitutionModel');

const eduController = {
  createInstitution: async (req, res) => {
    try {
      const created = await EducationalInstitution.create(req.body);
      return res.status(201).json(created);
    } catch (err) {
      console.error('createInstitution error:', err);
      return res.status(500).json({ error: 'Error creando institución educativa' });
    }
  },

  getInstitutions: async (req, res) => {
    try {
      const rows = await EducationalInstitution.getAll();
      return res.json(rows);
    } catch (err) {
      console.error('getInstitutions error:', err);
      return res.status(500).json({ error: 'Error obteniendo instituciones' });
    }
  },

  getInstitutionById: async (req, res) => {
    try {
      const id = req.params.id;
      const inst = await EducationalInstitution.findById(id);
      if (!inst) return res.status(404).json({ error: 'Institución no encontrada' });
      return res.json(inst);
    } catch (err) {
      console.error('getInstitutionById error:', err);
      return res.status(500).json({ error: 'Error obteniendo institución' });
    }
  },

  replaceInstitution: async (req, res) => {
    try {
      const id = req.params.id;
      const replaced = await EducationalInstitution.replace(id, req.body);
      if (!replaced) return res.status(404).json({ error: 'Institución no encontrada' });
      return res.json(replaced);
    } catch (err) {
      console.error('replaceInstitution error:', err);
      return res.status(500).json({ error: 'Error reemplazando institución' });
    }
  },

  updateInstitution: async (req, res) => {
    try {
      const id = req.params.id;
      const updated = await EducationalInstitution.update(id, req.body);
      if (!updated) return res.status(404).json({ error: 'Institución no encontrada' });
      return res.json(updated);
    } catch (err) {
      console.error('updateInstitution error:', err);
      return res.status(500).json({ error: 'Error actualizando institución' });
    }
  },

  deleteInstitution: async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await EducationalInstitution.remove(id);
      if (!deleted) return res.status(404).json({ error: 'Institución no encontrada' });
      return res.json({ message: 'Institución eliminada', deleted });
    } catch (err) {
      console.error('deleteInstitution error:', err);
      return res.status(500).json({ error: 'Error eliminando institución' });
    }
  }
};

module.exports = eduController;
const express = require('express');
const router = express.Router();

const teacherPageController = require('../controllers/teacherPageController');
const eduController = require('../controllers/educationalInstitutionController');

// 🔍 Ruta de búsqueda general
router.get('/', async (req, res) => {
  try {
    const query = req.query.query?.toLowerCase() || '';

    // Usar métodos existentes de los controladores si ofrecen búsqueda
    // Pero si no la tienen, puedes usar sus modelos directamente
    const TeacherPage = require('../models/teacherPageModel');
    const EducationalInstitution = require('../models/educationalInstitutionModel');

    const [teachers, institutions] = await Promise.all([
      TeacherPage.searchByName(query),
      EducationalInstitution.searchByName(query)
    ]);

    res.json({ institutions, teachers });
  } catch (err) {
    console.error('Error en búsqueda:', err);
    res.status(500).json({ error: 'Error interno en búsqueda' });
  }
});

module.exports = router;

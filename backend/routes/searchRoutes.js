const express = require('express');
const router = express.Router();

// uso de operaciones CRUD a través de endpoints RESTful

router.get('/', async (req, res) => {
  try {
    const query = req.query.query?.toLowerCase() || '';
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

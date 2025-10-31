const express = require('express');
const router = express.Router();
const eduController = require('../controllers/educationalInstitutionController');

router.post('/', eduController.createInstitution);           // POST /api/educational-institutions
router.get('/', eduController.getInstitutions);              // GET  /api/educational-institutions
router.get('/:id', eduController.getInstitutionById);        // GET  /api/educational-institutions/:id
router.put('/:id', eduController.replaceInstitution);        // PUT  /api/educational-institutions/:id
router.patch('/:id', eduController.updateInstitution);       // PATCH /api/educational-institutions/:id
router.delete('/:id', eduController.deleteInstitution);      // DELETE /api/educational-institutions/:id
router.get('/:id/teachers', eduController.getTeachersByInstitution);

module.exports = router;

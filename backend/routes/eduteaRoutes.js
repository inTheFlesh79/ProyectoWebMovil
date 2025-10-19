const express = require('express');
const router = express.Router();
const eduteaController = require('../controllers/eduteaController');

// CRUD y utilidades para relaciones edu <-> teacherPage
router.post('/', eduteaController.createLink);                     // POST /api/edutea
router.get('/', eduteaController.getAllLinks);                     // GET  /api/edutea
router.get('/edu/:eduId', eduteaController.getLinksByEdu);         // GET  /api/edutea/edu/:eduId
router.get('/teacher/:teacherPageId', eduteaController.getLinksByTeacher); // GET /api/edutea/teacher/:teacherPageId
router.get('/:eduId/:teacherPageId', eduteaController.getLinkByComposite); // GET /api/edutea/:eduId/:teacherPageId

// Reemplazar la relación (PUT) o actualizar (PATCH). 
// PUT here will remove existing mapping and insert the new one (transactional).
router.put('/:eduId/:teacherPageId', eduteaController.replaceLink);
router.patch('/:eduId/:teacherPageId', eduteaController.updateLink); // partial: same as replace for simple mapping

router.delete('/:eduId/:teacherPageId', eduteaController.deleteLink); // DELETE /api/edutea/:eduId/:teacherPageId

module.exports = router;
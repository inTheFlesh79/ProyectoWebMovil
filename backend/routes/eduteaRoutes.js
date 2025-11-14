const express = require('express');
const router = express.Router();
const eduteaController = require('../controllers/eduteaController');

// uso de operaciones CRUD a través de endpoints RESTful

router.post('/', eduteaController.createLink);                     // POST /api/edutea
router.get('/', eduteaController.getAllLinks);                     // GET  /api/edutea
router.get('/edu/:eduId', eduteaController.getLinksByEdu);         // GET  /api/edutea/edu/:eduId
router.get('/teacher/:teacherPageId', eduteaController.getLinksByTeacher); // GET /api/edutea/teacher/:teacherPageId
router.get('/:eduId/:teacherPageId', eduteaController.getLinkByComposite); // GET /api/edutea/:eduId/:teacherPageId
router.put('/:eduId/:teacherPageId', eduteaController.replaceLink);
router.patch('/:eduId/:teacherPageId', eduteaController.updateLink);
router.delete('/:eduId/:teacherPageId', eduteaController.deleteLink); // DELETE /api/edutea/:eduId/:teacherPageId

module.exports = router;
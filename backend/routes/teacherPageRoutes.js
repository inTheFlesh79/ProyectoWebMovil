const express = require('express');
const router = express.Router();
const teacherPageController = require('../controllers/teacherPageController');
const auth = require('../middleware/authMiddleware');

// uso de operaciones CRUD a través de endpoints RESTful

router.post('/', auth, teacherPageController.createTeacherPage);   // POST /api/teacher-pages
router.get('/', teacherPageController.getTeacherPages);           // GET  /api/teacher-pages
router.get('/:id', teacherPageController.getTeacherPageById);    // GET  /api/teacher-pages/:id
router.put('/:id', teacherPageController.replaceTeacherPage);    // PUT  /api/teacher-pages/:id
router.patch('/:id', teacherPageController.updateTeacherPage);   // PATCH /api/teacher-pages/:id
router.delete('/:id', teacherPageController.deleteTeacherPage);  // DELETE /api/teacher-pages/:id

module.exports = router;
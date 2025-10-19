const express = require('express');
const router = express.Router();
const teacherRatingController = require('../controllers/teacherRatingController');

router.post('/', teacherRatingController.createRating);            // POST /api/teacher-ratings
router.get('/', teacherRatingController.getRatings);               // GET /api/teacher-ratings
router.get('/:id', teacherRatingController.getRatingById);         // GET /api/teacher-ratings/:id
router.put('/:id', teacherRatingController.replaceRating);         // PUT /api/teacher-ratings/:id
router.patch('/:id', teacherRatingController.updateRating);        // PATCH /api/teacher-ratings/:id
router.delete('/:id', teacherRatingController.deleteRating);       // DELETE /api/teacher-ratings/:id

router.get('/teacher/:teacherPageId/all', teacherRatingController.getRatingsByTeacher);       // listar
router.get('/teacher/:teacherPageId/average', teacherRatingController.getAverageByTeacher);  // promedio

module.exports = router;

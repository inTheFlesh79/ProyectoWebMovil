const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const reviewVoteController = require('../controllers/reviewVoteController');

// uso de operaciones CRUD a través de endpoints RESTful

router.post('/', auth, reviewVoteController.registerVote);

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const commentVoteController = require('../controllers/commentVoteController');

// uso de operaciones CRUD a través de endpoints RESTful

router.post('/', auth, commentVoteController.registerVote);

module.exports = router;

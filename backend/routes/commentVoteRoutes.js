const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const commentVoteController = require('../controllers/commentVoteController');

router.post('/', auth, commentVoteController.registerVote);

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const reviewVoteController = require('../controllers/reviewVoteController');

router.post('/', auth, reviewVoteController.registerVote);

module.exports = router;

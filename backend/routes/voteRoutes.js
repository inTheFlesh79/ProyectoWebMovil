const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const auth = require('../middleware/authMiddleware');

// ✅ Registrar voto (like/dislike)
router.post('/', auth, voteController.vote);

module.exports = router;

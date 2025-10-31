const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const auth = require('../middleware/authMiddleware');

// uso de operaciones CRUD a través de endpoints RESTful

router.post('/', auth, voteController.vote);

module.exports = router;

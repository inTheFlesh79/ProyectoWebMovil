const express = require('express');
const router = express.Router();
const dpaController = require('../controllers/dpaController');

router.get('/regiones', dpaController.getRegiones);
router.get('/regiones/:codigo/comunas', dpaController.getComunas);

module.exports = router;

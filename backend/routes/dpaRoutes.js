const express = require('express');
const router = express.Router();
const dpaController = require('../controllers/dpaController');

// uso de operaciones CRUD a través de endpoints RESTful para obtener regiones y comunas

router.get('/regiones', dpaController.getRegiones);
router.get('/regiones/:codigo/comunas', dpaController.getComunas);

module.exports = router;

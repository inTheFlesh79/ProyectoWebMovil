const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

// Registro
router.post(
  '/register',
  [
    body('username').isLength({ min: 3 }).withMessage('username muy corto'),
    body('correo').isEmail().withMessage('correo inválido'),
    body('password').isLength({ min: 6 }).withMessage('password muy corta')
  ],
  validate,  // 👈 agrega este middleware aquí
  authController.register
);

// Login
router.post(
  '/login',
  [
    body('correo').isEmail().withMessage('correo inválido'),
    body('password').notEmpty().withMessage('password requerida')
  ],
  validate,  // 👈 y también aquí
  authController.login
);

// Ruta protegida (requiere token)
router.get('/me', auth, authController.me);

module.exports = router;

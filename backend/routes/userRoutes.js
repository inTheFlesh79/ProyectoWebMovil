const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas RESTful
router.get('/', userController.getUsers);        // GET todos los usuarios
router.get('/:id', userController.getUserById);  // GET usuario por ID
router.post('/', userController.createUser);     // POST crear nuevo usuario
router.put('/:id', userController.updateUser);   // PUT actualizar usuario completo
router.patch('/:id', userController.patchUser);  // PATCH actualizar parcialmente
router.delete('/:id', userController.deleteUser);// DELETE eliminar usuario

module.exports = router;

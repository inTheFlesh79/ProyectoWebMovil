const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// uso de operaciones CRUD a través de endpoints RESTful

router.get('/', userController.getUsers);        // GET todos los usuarios
router.get('/:id', userController.getUserById);  // GET usuario por ID
router.post('/', userController.createUser);     // POST crear nuevo usuario
router.put('/:id', userController.updateUser);   // PUT actualizar usuario completo
router.patch('/:id', userController.patchUser);  // PATCH actualizar parcialmente
router.delete('/:id', userController.deleteUser);// DELETE eliminar usuario
router.get('/:id/profile', userController.getUserProfile);

module.exports = router;

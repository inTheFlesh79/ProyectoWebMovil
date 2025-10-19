const User = require('../models/userModel');

const userController = {
  // CREATE
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creando usuario' });
    }
  },

  // READ (todos)
  getUsers: async (req, res) => {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error obteniendo usuarios' });
    }
  },

  // READ (uno por ID)
  getUserById: async (req, res) => {
    try {
      const user = await User.getById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error obteniendo usuario' });
    }
  },

  // UPDATE (PUT)
  updateUser: async (req, res) => {
    try {
      const updated = await User.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error actualizando usuario' });
    }
  },

  // UPDATE parcial (PATCH)
  patchUser: async (req, res) => {
    try {
      const patched = await User.patch(req.params.id, req.body);
      if (!patched) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(patched);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error actualizando parcialmente usuario' });
    }
  },

  // DELETE
  deleteUser: async (req, res) => {
    try {
      const deleted = await User.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error eliminando usuario' });
    }
  }
};

module.exports = userController;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/userModel');

function signToken(user) {
  // payload mínimo: id y role
  return jwt.sign(
    { id: user.userid, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
}

const authController = {
  register: async (req, res) => {
    try {
      // Validaciones (express-validator)
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, correo, password, role, rut, region, district, isMember, profilePicture } = req.body;

      // Verifica si existe correo
      const existing = await User.findByEmail(correo);
      if (existing) {
        return res.status(409).json({ error: 'El correo ya está registrado' });
      }

      // Hashea password
      const hashed = await bcrypt.hash(password, 10);

      // Crea usuario (reusa tu modelo)
      const newUser = await User.create({
        username,
        correo,
        password: hashed,
        role: role ?? 0,
        rut: rut ?? null,
        region: region ?? null,
        district: district ?? null,
        isMember: typeof isMember === 'boolean' ? isMember : true,
        profilePicture: profilePicture ?? null
      });

      // Emite token
      const token = signToken(newUser);

      // Por seguridad, no devuelvas la password
      delete newUser.password;

      return res.status(201).json({ user: newUser, token });
    } catch (err) {
      console.error('auth.register error:', err);
      return res.status(500).json({ error: 'Error registrando usuario' });
    }
  },

  login: async (req, res) => {
    try {
      // Validaciones (express-validator)
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { correo, password } = req.body;

      const user = await User.findByEmail(correo);
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const token = signToken(user);
      delete user.password;

      return res.json({ user, token });
    } catch (err) {
      console.error('auth.login error:', err);
      return res.status(500).json({ error: 'Error en login' });
    }
  },

  me: async (req, res) => {
    // req.user viene del middleware de auth
    try {
      const user = await User.getById(req.user.id);
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
      delete user.password;
      return res.json({ user });
    } catch (err) {
      console.error('auth.me error:', err);
      return res.status(500).json({ error: 'Error obteniendo perfil' });
    }
  }
};

module.exports = authController;

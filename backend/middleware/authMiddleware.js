const jwt = require('jsonwebtoken');

// validaciones de usuarios a través de JWT

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // id, role
    next();
  } catch (err) {
    console.error('❌ Error verificando token:', err);
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

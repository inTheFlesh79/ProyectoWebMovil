const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('❌ Errores de validación:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

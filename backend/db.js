require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',        // tu usuario de PostgreSQL
  host: 'localhost',
  database: 'postgres',     // nombre de tu base de datos
  password: '1100',   // tu contraseña
  port: 5432,                // puerto por defecto
});

pool.connect()
  .then(() => console.log('Conectado a PostgreSQL'))
  .catch(err => console.error('Error de conexión', err));

module.exports = pool;
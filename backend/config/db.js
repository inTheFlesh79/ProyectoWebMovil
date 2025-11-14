require('dotenv').config();
const { Pool } = require('pg');

// Importante: esto usa tu SUPABASE_DB_URL del .env
const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false } // requerido por Supabase
});

// Mensaje para confirmar conexión sólo si falla
pool.connect()
  .then(() => console.log('Conectado a Supabase PostgreSQL'))
  .catch(err => console.error('Error de conexión a Supabase', err));

module.exports = pool;
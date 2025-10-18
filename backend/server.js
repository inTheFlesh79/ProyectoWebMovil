const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Importar rutas
const userRoutes = require('./routes/userRoutes');

// Rutas
app.use('/api/users', userRoutes);

// Ruta raíz opcional
app.get('/', (req, res) => {
  res.send('Hola Mundo desde Express!');
});

// Levantar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
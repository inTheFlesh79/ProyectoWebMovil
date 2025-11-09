const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const teacherPageRoutes = require('./routes/teacherPageRoutes');
const educationalInstitutionRoutes = require('./routes/educationalInstitutionRoutes');
const eduteaRoutes = require('./routes/eduteaRoutes');
const teacherRatingRoutes = require('./routes/teacherRatingRoutes');
const commentRoutes = require('./routes/commentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');
const voteRoutes = require('./routes/voteRoutes');
const commentVoteRoutes = require('./routes/commentVoteRoutes');
const reviewVoteRoutes = require('./routes/reviewVoteRoutes');
const teacherReviewRatingRoutes = require('./routes/teacherReviewRatingRoutes');

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/teacherPage', teacherPageRoutes);
app.use('/api/educationalInstitution', educationalInstitutionRoutes);
app.use('/api/edutea', eduteaRoutes);
app.use('/api/teacherRating', teacherRatingRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/comment-votes', commentVoteRoutes);
app.use('/api/review-votes', reviewVoteRoutes);
app.use('/api/teacherReviewRating', teacherReviewRatingRoutes);


// Ruta raíz opcional
app.get('/', (req, res) => {
  res.send('Hola Mundo desde Express!');
});

// Levantar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
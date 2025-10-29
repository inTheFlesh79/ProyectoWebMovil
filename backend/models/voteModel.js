const pool = require('../config/db');

const Vote = {
  async registerVote(postid, userid, vote_type) {
    try {
      // Verificar si ya existe voto previo
      const existing = await pool.query(
        'SELECT * FROM Votes WHERE postid = $1 AND userid = $2',
        [postid, userid]
      );

      if (existing.rows.length > 0) {
        const previous = existing.rows[0];
        if (previous.vote_type === vote_type) {
          // Mismo voto → no hacer nada
          return { message: 'Voto ya registrado', changed: false };
        }

        // Cambia el voto (de like a dislike o viceversa)
        await pool.query(
          'UPDATE Votes SET vote_type = $1 WHERE postid = $2 AND userid = $3',
          [vote_type, postid, userid]
        );
      } else {
        // Nuevo voto
        await pool.query(
          'INSERT INTO Votes (postid, userid, vote_type) VALUES ($1, $2, $3)',
          [postid, userid, vote_type]
        );
      }

      // Actualiza contadores en Post
      const counts = await pool.query(`
        SELECT
          SUM(CASE WHEN vote_type = 'like' THEN 1 ELSE 0 END) AS likes,
          SUM(CASE WHEN vote_type = 'dislike' THEN 1 ELSE 0 END) AS dislikes
        FROM Votes WHERE postid = $1
      `, [postid]);

      await pool.query(
        'UPDATE Post SET likes = $1, dislikes = $2 WHERE postid = $3',
        [counts.rows[0].likes || 0, counts.rows[0].dislikes || 0, postid]
      );

      return { message: 'Voto registrado correctamente', changed: true };
    } catch (err) {
      console.error('Error en registerVote:', err);
      throw err;
    }
  }
};

module.exports = Vote;

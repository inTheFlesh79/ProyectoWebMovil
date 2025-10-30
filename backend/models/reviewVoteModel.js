const pool = require('../config/db');

const ReviewVote = {
  registerVote: async (userid, reviewid, vote_type) => {
    try {
      // ¿Ya existe voto de este usuario?
      const existing = await pool.query(
        'SELECT vote_type FROM ReviewVotes WHERE reviewid = $1 AND userid = $2',
        [reviewid, userid]
      );

      if (existing.rows.length > 0) {
        if (existing.rows[0].vote_type === vote_type) {
          // mismo voto → toggle OFF (elimina)
          await pool.query(
            'DELETE FROM ReviewVotes WHERE reviewid = $1 AND userid = $2',
            [reviewid, userid]
          );
        } else {
          // cambia like <-> dislike
          await pool.query(
            'UPDATE ReviewVotes SET vote_type = $1 WHERE reviewid = $2 AND userid = $3',
            [vote_type, reviewid, userid]
          );
        }
      } else {
        // voto nuevo
        await pool.query(
          'INSERT INTO ReviewVotes (reviewid, userid, vote_type) VALUES ($1, $2, $3)',
          [reviewid, userid, vote_type]
        );
      }

      // Recontar totales
      const { rows } = await pool.query(
        `SELECT
           COALESCE(SUM(CASE WHEN vote_type='like' THEN 1 ELSE 0 END),0) AS likes,
           COALESCE(SUM(CASE WHEN vote_type='dislike' THEN 1 ELSE 0 END),0) AS dislikes
         FROM ReviewVotes
         WHERE reviewid = $1`,
        [reviewid]
      );

      const likes = Number(rows[0].likes) || 0;
      const dislikes = Number(rows[0].dislikes) || 0;

      // Reflejar en la tabla Review
      await pool.query(
        'UPDATE Review SET likes = $1, dislikes = $2 WHERE reviewId = $3',
        [likes, dislikes, reviewid]
      );

      return { likes, dislikes };
    } catch (err) {
      console.error('Error registrando voto en review:', err);
      throw err;
    }
  },
};

module.exports = ReviewVote;

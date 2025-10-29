const pool = require('../config/db');

const CommentVote = {
  registerVote: async (userid, commentid, vote_type) => {
    try {
      const existing = await pool.query(
        'SELECT vote_type FROM CommentVotes WHERE commentid = $1 AND userid = $2',
        [commentid, userid]
      );

      if (existing.rows.length > 0) {
        if (existing.rows[0].vote_type === vote_type) {
          // mismo voto -> quitar (toggle off)
          await pool.query('DELETE FROM CommentVotes WHERE commentid = $1 AND userid = $2', [commentid, userid]);
        } else {
          // cambiar de like <-> dislike
          await pool.query(
            'UPDATE CommentVotes SET vote_type = $1 WHERE commentid = $2 AND userid = $3',
            [vote_type, commentid, userid]
          );
        }
      } else {
        // voto nuevo
        await pool.query(
          'INSERT INTO CommentVotes (commentid, userid, vote_type) VALUES ($1, $2, $3)',
          [commentid, userid, vote_type]
        );
      }

      // recuento
      const { rows } = await pool.query(
        `SELECT
           COALESCE(SUM(CASE WHEN vote_type='like' THEN 1 ELSE 0 END),0) AS likes,
           COALESCE(SUM(CASE WHEN vote_type='dislike' THEN 1 ELSE 0 END),0) AS dislikes
         FROM CommentVotes
         WHERE commentid = $1`,
        [commentid]
      );

      const likes = Number(rows[0].likes) || 0;
      const dislikes = Number(rows[0].dislikes) || 0;

      await pool.query(
        'UPDATE Comment SET likes = $1, dislikes = $2 WHERE commentId = $3',
        [likes, dislikes, commentid]
      );

      return { likes, dislikes };
    } catch (err) {
      console.error('Error registrando voto en comentario:', err);
      throw err;
    }
  },
};

module.exports = CommentVote;

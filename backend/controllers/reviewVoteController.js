const jwt = require('jsonwebtoken');
const ReviewVote = require('../models/reviewVoteModel');

const reviewVoteController = {
  registerVote: async (req, res) => {
    try {
      // token → userid
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token requerido' });
      }
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userid = decoded.id;

      // acepta reviewid | reviewId y vote_type | voteType
      const { reviewid, reviewId, vote_type, voteType } = req.body;
      const rid = reviewid ?? reviewId;
      const vtype = vote_type ?? voteType;

      if (!rid || !vtype) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      const totals = await ReviewVote.registerVote(userid, rid, vtype);
      return res.json(totals); // {likes, dislikes}
    } catch (err) {
      console.error('Error registrando voto en review:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

module.exports = reviewVoteController;

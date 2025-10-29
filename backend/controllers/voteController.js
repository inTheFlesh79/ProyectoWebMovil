const Vote = require('../models/voteModel');

const voteController = {
  vote: async (req, res) => {
    try {
      const { postid, vote_type } = req.body;
      const userid = req.user.id; // viene del token JWT

      if (!['like', 'dislike'].includes(vote_type)) {
        return res.status(400).json({ error: 'Tipo de voto inválido' });
      }

      const result = await Vote.registerVote(postid, userid, vote_type);
      res.json(result);
    } catch (err) {
      console.error('Error registrando voto:', err);
      res.status(500).json({ error: 'Error registrando voto' });
    }
  }
};

module.exports = voteController;

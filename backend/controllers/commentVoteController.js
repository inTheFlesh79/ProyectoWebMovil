const CommentVote = require('../models/commentVoteModel');
const jwt = require('jsonwebtoken');

const commentVoteController = {
  registerVote: async (req, res) => {
    try {
      // token 
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token requerido' });
      }
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      // ambas variantes de nombres
      const { commentid, commentId, vote_type, voteType } = req.body;
      const cid = commentid ?? commentId;
      const vtype = vote_type ?? voteType;

      if (!cid || !vtype) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const totals = await CommentVote.registerVote(userId, cid, vtype);
      return res.json(totals);
    } catch (err) {
      console.error('Error registrando voto en comentario:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
};

module.exports = commentVoteController;

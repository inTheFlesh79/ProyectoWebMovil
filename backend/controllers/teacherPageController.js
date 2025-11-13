const TeacherPage = require('../models/teacherPageModel');
const pool = require('../config/db');

const teacherPageController = {
  createTeacherPage: async (req, res) => {
    try {
      const user = req.user; // viene del JWT

      // Solo admins (role = 1) pueden crear profesores
      if (!user || user.role !== 1) {
        return res.status(403).json({ error: 'No tienes permiso para agregar profesores' });
      }

      const { name, content } = req.body;

      // Validaciones básicas
      if (!name || !content) {
        return res.status(400).json({ error: 'Nombre y descripción son obligatorios' });
      }

      if (name.length > 120 || content.length > 500) {
        return res.status(400).json({ error: 'Exceso de caracteres en los campos' });
      }

      // Crear teacherPage sin imagen
      const page = await TeacherPage.create({
        name,
        content,
        profilePicture: null
      });

      return res.status(201).json(page);
    } catch (err) {
      console.error('createTeacherPage error:', err);
      return res.status(500).json({ error: 'Error creando teacher page' });
    }
  },


  getTeacherPages: async (req, res) => {
    try {
      const pages = await TeacherPage.getAll();
      return res.json(pages);
    } catch (err) {
      console.error('getTeacherPages error:', err);
      return res.status(500).json({ error: 'Error obteniendo teacher pages' });
    }
  },

  getTeacherPageById: async (req, res) => {
    try {
      const id = req.params.id;
      const page = await TeacherPage.findById(id);
      if (!page) return res.status(404).json({ error: 'TeacherPage no encontrado' });
      return res.json(page);
    } catch (err) {
      console.error('getTeacherPageById error:', err);
      return res.status(500).json({ error: 'Error obteniendo teacher page' });
    }
  },

  replaceTeacherPage: async (req, res) => {
    try {
      const id = req.params.id;
      const updated = await TeacherPage.replace(id, req.body);
      if (!updated) return res.status(404).json({ error: 'TeacherPage no encontrado' });
      return res.json(updated);
    } catch (err) {
      console.error('replaceTeacherPage error:', err);
      return res.status(500).json({ error: 'Error reemplazando teacher page' });
    }
  },

  updateTeacherPage: async (req, res) => {
    try {
      const id = req.params.id;
      const updated = await TeacherPage.update(id, req.body);
      if (!updated) return res.status(404).json({ error: 'TeacherPage no encontrado' });
      return res.json(updated);
    } catch (err) {
      console.error('updateTeacherPage error:', err);
      return res.status(500).json({ error: 'Error actualizando teacher page' });
    }
  },

  deleteTeacherPage: async (req, res) => {
    const client = await pool.connect();

    try {
      const user = req.user;

      // Solo admins
      if (!user || user.role !== 1) {
        return res.status(403).json({ error: 'No tienes permiso para eliminar profesores' });
      }

      const teacherId = req.params.id;

      await client.query('BEGIN');

      // 1) ELIMINAR VOTOS DE REVIEWS
      await client.query(
        `DELETE FROM ReviewVotes 
        WHERE reviewid IN (
          SELECT reviewid FROM Review WHERE teacherPageId = $1
        )`,
        [teacherId]
      );

      // 2) ELIMINAR REVIEWS
      await client.query(
        `DELETE FROM Review WHERE teacherPageId = $1`,
        [teacherId]
      );

      // 3) ELIMINAR RATINGS
      await client.query(
        `DELETE FROM TeacherRating WHERE teacherPageId = $1`,
        [teacherId]
      );

      // 4) ELIMINAR rel. institución-profesor
      await client.query(
        `DELETE FROM eduTea WHERE teacherPageId = $1`,
        [teacherId]
      );

      // 5) ELIMINAR PROFESOR
      const result = await client.query(
        `DELETE FROM TeacherPage WHERE teacherPageId = $1 RETURNING *`,
        [teacherId]
      );

      await client.query('COMMIT');

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
      }

      return res.json({ message: 'Profesor eliminado correctamente' });

    } catch (err) {
      await client.query('ROLLBACK');
      console.error('deleteTeacherPage error:', err);
      return res.status(500).json({ error: 'Error eliminando profesor' });
    } finally {
      client.release();
    }
  }


};

module.exports = teacherPageController;

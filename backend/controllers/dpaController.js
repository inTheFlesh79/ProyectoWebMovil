const axios = require('axios');

const dpaApi = axios.create({
  baseURL: 'https://apis.digital.gob.cl/dpa',
  timeout: 5000
});

// Cache opcional
let regionesCache = null;
let regionesCacheAt = 0;

let comunasCache = {};
const CACHE_TTL = 24 * 60 * 60 * 1000;

function isFresh(ts) {
  return Date.now() - ts < CACHE_TTL;
}

const dpaController = {

  async getRegiones(req, res) {
    try {
      if (regionesCache && isFresh(regionesCacheAt)) {
        return res.json(regionesCache);
      }

      const { data } = await dpaApi.get('/regiones');

      const clean = data.map(r => ({
        codigo: r.codigo,
        nombre: r.nombre
      }));

      regionesCache = clean;
      regionesCacheAt = Date.now();

      res.json(clean);

    } catch (err) {
      console.error('Error en getRegiones:', err);
      res.status(500).json({ error: 'Error obteniendo regiones' });
    }
  },


  async getComunas(req, res) {
    try {
      const codigo = req.params.codigo;

      // Validación
      if (!/^\d{1,2}$/.test(codigo)) {
        return res.status(400).json({ error: 'Código inválido' });
      }

      if (comunasCache[codigo] && isFresh(comunasCache[codigo].time)) {
        return res.json(comunasCache[codigo].data);
      }

      const { data } = await dpaApi.get(`/regiones/${codigo}/comunas`);

      const clean = data.map(c => ({
        codigo: c.codigo,
        nombre: c.nombre
      }));

      comunasCache[codigo] = {
        data: clean,
        time: Date.now()
      };

      res.json(clean);

    } catch (err) {
      console.error('Error en getComunas:', err);
      res.status(500).json({ error: 'Error obteniendo comunas' });
    }
  }

};

module.exports = dpaController;

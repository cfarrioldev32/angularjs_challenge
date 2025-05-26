const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


const readJson = (filePath) =>
  new Promise((resolve, reject) =>
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    })
  );

const writeJson = (filePath, newItem) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (readErr, data) => {
      let jsonContent = { turnos: [] };

      if (readErr) {
        if (readErr.code !== 'ENOENT') {
          return reject(readErr);
        }
      } else {
        try {
          jsonContent = JSON.parse(data);

          if (!Array.isArray(jsonContent.turnos)) {
            return reject(new Error('El contenido de "turnos" no es un array.'));
          }
        } catch (parseErr) {
          return reject(parseErr);
        }
      }

      jsonContent.turnos.push(newItem);

      fs.writeFile(filePath, JSON.stringify(jsonContent, null, 2), 'utf8', (writeErr) => {
        if (writeErr) reject(writeErr);
        else resolve();
      });
    });
  });


app.get('/data/especialidades', async (req, res) => {
  try {
    const data = await readJson(path.join(__dirname, 'public', 'data', 'especialidades.json'));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'No se pudo leer especialidades.json' });
  }
});

app.post('/data/profesionales', async (req, res) => {
  try {
    const { especialidad } = req.body;
    const data = await readJson(path.join(__dirname, 'public', 'data', 'profesionales.json'));
    res.json(data[especialidad]);
  } catch (err) {
    res.status(500).json({ error: 'Error al leer el archivo de profesionales' });
  }
});

app.post('/data/turno', async (req, res) => {
  try {
    const turno = req.body;

    await writeJson(path.join(__dirname, 'public', 'data', 'turnos.json'), turno);

    res.json({ mensaje: `Gracias ${turno.nombre}, tu turno con ${turno.profesional.nombre} fue registrado.` });
  } catch (err) {
    console.error('Error al guardar el turno:', err.message);
    res.status(500).json({ error: 'No se pudo guardar el turno.' });
  }
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

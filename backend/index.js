const express= require('express');
const sequelize = require('./Connection/database');
const Evento = require('./Models/Evento');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

sequelize.sync().then(() => {
    console.log('Base de datos y tabla "eventos" creadas y conectadas.');
}).catch(err => {
    console.error('Error al sincronizar con la base de datos:', err);
});

// Ruta para obtener todos los eventos
app.get('/api/eventos', async (req, res) => {
    try {
        const eventos = await Evento.findAll();
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los eventos' });
    }
});


app.post('/api/eventos', upload.single('foto'), async (req, res) => {
    try {
        const { titulo, descripcion, fecha, hora } = req.body;
        // La ruta de la imagen se obtiene de req.file
        const foto = req.file ? `/uploads/${req.file.filename}` : null;

        const nuevoEvento = await Evento.create({
            titulo,
            descripcion,
            fecha,
            hora,
            foto
        });

        res.status(201).json(nuevoEvento);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el evento', details: error.message });
    }
});

// Ruta para eliminar un evento por ID
app.delete('/api/eventos/:id', async (req, res) => {
    try {
        await Evento.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el evento' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



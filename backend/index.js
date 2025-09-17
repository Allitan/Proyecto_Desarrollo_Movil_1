const express= require('express');
const sequelize = require('./Connection/database');
const Evento = require('./Models/Evento');
const Usuario = require('./Models/Usuario');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs')

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




// Ruta de Registro
app.post('/api/auth/registro', async (req, res) => {
    try {
        const { nombre_usuario, email, contraseña } = req.body;
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        
        const nuevoUsuario = await Usuario.create({
            nombre_usuario,
            email,
            contraseña: hashedPassword
        });

        res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario', details: error.message });
    }
});

// Ruta de Inicio de Sesión
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, contraseña } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) { return res.status(404).json({ error: 'Usuario no encontrado.' }); }
        const esValido = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!esValido) { return res.status(401).json({ error: 'Contraseña incorrecta.' }); }
        res.json({ mensaje: 'Inicio de sesión exitoso.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión', details: error.message });
    }
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
        const { titulo, descripcion, fechaHora} = req.body;
        // La ruta de la imagen se obtiene de req.file
        const foto = req.file ? `/uploads/${req.file.filename}` : null;

        const nuevoEvento = await Evento.create({
            titulo,
            descripcion,
            fechaHora,
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



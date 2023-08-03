import pkg from 'pg'
import express from 'express'
import cors from 'cors'
import {
    postUsuario,
    getUsuarios,
    deleteUsuario,
    putUsuario,
    getTransferencias,
    postTransferencias
} from './db/db.js'

const { Pool } = pkg
const app = express()

//middleware
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const BD = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'gameover',
    port: 5432,
    database: 'sprint7_grupo1'
});

app.get('/usuarios', async (req, res) => {
    const usuarios = await getUsuarios()
    res.send(usuarios)
})

app.post('/usuario', async (req, res) => {
    const usuario = req.body;
    await postUsuario(usuario);
    res.send('Usuario creado exitosamente');

});

app.put('/usuario/:id', async (req, res) => {
    const usuario = req.body
    console.log(usuario)
    const actualizar = await putUsuario(usuario)
    res.send(actualizar)
})

app.delete('/usuario/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const resultado = await deleteUsuario(id);
        res.status(200).json({ mensaje: 'Usuario eliminado correctamente', resultado });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario.' });
    }
});


app.get('/transferencias', async (req, res) => {
    const transferencias = await getTransferencias()
    res.send(transferencias)
})

app.post('/transferencia', async (req, res) => {
    const transferencia = req.body
    await postTransferencias(transferencia)
})

BD.connect()
    .then(() => {
        console.log('Conectado a la base de datos');
    })
    .catch((error) => {
        console.error('Error al conectarse a la base de datos:', error);
    });

const server = app.listen(3000, () => {
    console.log('SERVIDOR LEVANTADO EN PUERTO 3000');
});
import pkg from 'pg'
import express from 'express'
import dotenv from 'dotenv'
import transferenciasRoutes from './routes/transferencias.js'
import usuarioRoutes from './routes/usuario.js'

const { Pool } = pkg
const app = express()
dotenv.config()

//middleware
app.use(express.json())
app.use(express.static('public'))

apiPaths = {
    usuario: 'usuario',
    transferencias: 'transferencias'
}

app.use(apiPaths.usuario, usuarioRoutes)
app.use(apiPaths.transferencias, transferenciasRoutes)

try {
    const BD = new Pool({
        user: 'postgres',
        host: 'localhost',
        password: 'gameover',
        port: 5432,
        database: 'SPRINT7_GRUPO1'
    })
    BD.connect
        .then(() => {
            console.log('Conectado a la base de datos')
        })
} catch (error) {
    console.log('Error al conectarse a la base de datos')
}

app.listen(3000, () => {
    console.log('SERVIDOR LEVANTADO EN PUERTO 3000')
})
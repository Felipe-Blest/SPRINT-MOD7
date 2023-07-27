import {
    nuevoUsuario,
    getUsuarios,
    eliminarUsuario
} from '../app.js'

export const POST = async (req, res) => {
    try {
        const { nombre, balance } = req.body
        nuevoUsuario()
        res.status(201).json({ message: `Usuario ${nombre} creado exitosamente ` })
    } catch (error) {
        res.status(500).json({ message: 'Ups, algo salió mal' })
    }
}

export const GET = async (req, res) => {
    try {
        const { nombre, balance } = req.body
        getUsuarios()
    } catch (error) {
        res.status(500).json({ message: 'Algo salió mal al recuperar la información' })
    }
}

export const DELETE = async (req, res) => {
    try {
        const { nombre, balance } = req.body
        eliminarUsuario()
    } catch (error) {
        res.status(500).json({ message: 'Algo salió mal al eliminar al usuario' })
    }
}

export const PUT = async (req, res) => {
    try {

    } catch (error) {

    }
}



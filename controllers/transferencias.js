import { getTransferencias, nuevaTransferencia, } from '../app.js'

export const GET = async (req, res) => {
    try {
        const { emisor, receptor, monto, fecha } = req.body
        getTransferencias()
    } catch (error) {
        res.status(500).json({ message: `Error al recuperar la transferencia` })
    }
}

export const POST = async (req, res) => {
    try {
        const { emisor, receptor, monto, fecha } = req.body
        nuevaTransferencia()
    } catch (error) {
        res.status(500).json({ message: `Error al realizar la transferencia de ${emisor} hacia ${receptor}` })
    }
}
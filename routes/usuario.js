import express from 'express'

const router = express.Router()

router.get('/', getUsuarios)
router.post('/usuario/id', nuevoUsuario)
router.delete('/usuario/:id', eliminarUsuario)
router.put('usuario/:id', editUsuario)

export default router;
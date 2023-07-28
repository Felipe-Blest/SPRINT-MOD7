import express from 'express'
import { getUsuarios, postUsuario, deleteUsuario, putUsuario } from '../db/db.js'
const router = express.Router()

router.get('/', getUsuarios)
router.post('/usuario/id', postUsuario)
router.delete('/usuario/:id', deleteUsuario)
router.put('usuario/:id', putUsuario)

export default router;
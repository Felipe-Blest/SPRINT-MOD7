import express from 'express'
import { GET, POST, DELETE, PUT } from '../controllers/usuario.js'
const router = express.Router()

router.get('/', GET)
router.post('/usuario/id', POST)
router.delete('/usuario/:id', DELETE)
router.put('usuario/:id', PUT)

export default router;
import express from 'express'
import { GET, POST } from '../controllers/transferencias.js'

const router = express.Router()

router.get('/transferencias', GET)
router.post('/transferencia', POST)

export default router;
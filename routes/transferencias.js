import express from 'express'
import { getTransferencias, postTransferencias } from '../db/db.js'
const router = express.Router()

router.get('/transferencias', getTransferencias)
router.post('/transferencia', postTransferencias)

export default router;
import express from 'express'

const router = express.Router()

router.get('/transferencias',getTransferencias)
router.post('/transferencia', nuevaTransferencia)

export default router;
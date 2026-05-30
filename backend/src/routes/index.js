import { Router } from 'express'
import pingRouter from './ping.route.js'
import cryptoRouter from './crypto.route.js'

const router = Router()

router.use('/ping', pingRouter)
router.use('/crypto', cryptoRouter)

export default router

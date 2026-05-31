import { Router } from 'express'
import pingRouter from './ping.route.js'
import cryptoRouter from './crypto.route.js'
import favoritesRouter from './favorites.route.js'

const router = Router()

router.use('/ping', pingRouter)
router.use('/crypto', cryptoRouter)
router.use('/favorites', favoritesRouter)

export default router

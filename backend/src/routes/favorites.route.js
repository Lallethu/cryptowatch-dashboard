import { Router } from 'express'
import { FavoritesService } from '../services/favorites.service.js'
import { CoinGeckoService } from '../services/coingecko.service.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const ids = await FavoritesService.getFavorites()
    const coins = await CoinGeckoService.getMarkets(ids)
    res.json({ success: true, data: coins })
  } catch (err) {
    res.status(502).json({ success: false, error: { message: err.message } })
  }
})

router.post('/', async (req, res) => {
  try {
    const { id } = req.body
    const data = await FavoritesService.addFavorite(id)
    res.json({ success: true, data })
  } catch (err) {
    res.status(502).json({ success: false, error: { message: err.message } })
  }
})

router.delete('/', async (req, res) => {
  try {
    const data = await FavoritesService.removeFavorite(req.body.id)
    res.json({ success: true, data })
  } catch (err) {
    res.status(502).json({ success: false, error: { message: err.message } })
  }
})

export default router

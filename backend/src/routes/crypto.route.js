import { Router } from 'express'
import { CoinGeckoService } from '../services/coingecko.service.js'

const router = Router()

router.get('/get_markets', async (_req, res) => {
  try {
    const data = await CoinGeckoService.getMarkets()
    res.json({ success: true, data })
  } catch (err) {
    res.status(502).json({ success: false, error: { message: err.message } })
  }
})

router.get('/market_chart/:id', async (req, res) => {
  try {
    const data = await CoinGeckoService.marketChart(req.params.id)
    res.json({ success: true, data })
  } catch (err) {
    res.status(502).json({ success: false, error: { message: err.message } })
  }
})

export default router

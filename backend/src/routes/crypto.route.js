import { Router } from 'express'
import { CoinGeckoService } from '../services/coingecko.service.js'

const router = Router()

router.get('/getMarkets', async (req, res) => {
  try {
    const data = await CoinGeckoService.getMarkets()
    res.json({ success: true, data })
  } catch (error) {
    res.status(502).json({ success: false, error: { message: error.message } })
  }
})

export default router

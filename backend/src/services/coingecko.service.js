import { config } from '../config/index.js'
import { AppError } from '../middleware/errorHandler.js'

export const CoinGeckoService = {
  getMarkets: async () => {
    const searchParams = new URLSearchParams({
      price_change_percentage: '24h',
      order: 'market_cap_desc',
      vs_currency: 'usd',
      per_page: 10,
      page: 1,
    })

    const response = await fetch(
      `${config.coingeckoapi.base_url}/coins/markets?${searchParams.toString()}`,
      {
        headers: {
          'x-cg-demo-api-key': config.coingeckoapi.key,
        },
      }
    )

    if (!response.ok) throw new AppError(response.error.message, response.status)

    return response.json()
  },
}

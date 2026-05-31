import { config } from '../config/index.js'
import { AppError } from '../middleware/errorHandler.js'

const SEVEN_DAYS_TIMESTAMP = 7 * 24 * 60 * 60 * 1000

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

  marketChart: async id => {
    const to = Date.now()
    const from = Date.now() - SEVEN_DAYS_TIMESTAMP

    const searchParams = new URLSearchParams({
      vs_currency: 'usd',
      interval: 'daily',
      from: from,
      to: to,
      per_page: 7,
      page: 1,
    })

    const response = await fetch(
      `${config.coingeckoapi.base_url}/coins/${id}/market_chart/range?${searchParams.toString()}`,
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

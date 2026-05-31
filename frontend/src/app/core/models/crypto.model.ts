export interface Crypto {
	id: string
	name: string
	symbol: string
	image: string
	current_price: number
	price_change_24h: number
	ath: number
	circulating_supply: number
}

export interface CryptoDetail {
	prices: [number, number][]
	market_caps: [number, number][]
	total_volumes: [number, number][]
}

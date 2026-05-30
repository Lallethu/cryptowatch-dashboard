import 'dotenv/config'

const required = [
  ['PORT', 'The server port'],
  ['COINGECKO_API_KEY', 'Secret key to use in coingeck request api call'],
  ['DB_FILE', "Either: 'favorites.json' | 'favorites.sqlite'"],
  ['CLIENT_URL', 'Client frontend URL (CORS)'],
]

const missing = required.filter(([key]) => !process.env[key])

if (missing.length > 0) {
  console.error('\n❌ Env variables missing:')

  missing.forEach(([key, description]) => {
    console.error(`   -> ${key} : ${description}`)
  })

  console.error('\n💡 Copy .env.example in .env and fill up the missing values\n')
  process.exit(1)
}

export const config = {
  server: {
    port: parseInt(process.env.PORT, 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production',
  },
  db: {
    file: process.env.DB_FILE,
  },
  coingeckoapi: {
	base_url: 'https://api.coingecko.com/api/v3',
    key: process.env.COINGECKO_API_KEY,
    ids: [],
  },
  client: {
    url: process.env.CLIENT_URL,
  },
}

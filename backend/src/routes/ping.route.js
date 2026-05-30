import { Router } from 'express'
import { config } from '../config/index.js'
import { existsSync, readFileSync } from 'fs'

const router = Router()

const formatUptime = seconds => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `${h}h ${m}m ${s}s`
}

router.get('/', (_req, res) => {
  const file = `src/data/${config.db.file}`
  const isHealthy = existsSync(file)
  const data = isHealthy ? readFileSync(file, 'utf8') : {}
  const uptime = formatUptime(process.uptime())

  res.status(isHealthy ? 200 : 503).json({
    success: isHealthy,
    data: {
      status: isHealthy ? 'ok' : 'degraded',
      version: '1.0.0',
      environment: config.server.nodeEnv,
      timestamp: new Date().toISOString(),
      uptime,
      services: {
        favorites: data,
      },
    },
  })
})

export default router

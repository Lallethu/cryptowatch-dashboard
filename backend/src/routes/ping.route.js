import { Router } from 'express'
import { access, readFile } from 'fs/promises'
import { config } from '../config/index.js'

const router = Router()

const formatUptime = seconds => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `${h}h ${m}m ${s}s`
}

router.get('/', async (_req, res) => {
  const filePath = `src/data/${config.db.file}`

  try {
    await access(filePath)
    const data = await readFile(filePath, 'utf8')

    res.status(200).json({
      success: true,
      data: {
        status: 'ok',
        version: '1.0.0',
        environment: config.server.nodeEnv,
        timestamp: new Date().toISOString(),
        uptime: formatUptime(process.uptime()),
        services: { favorites: data },
      },
    })
  } catch {
    res.status(503).json({
      success: false,
      data: {
        status: 'degraded',
        version: '1.0.0',
        environment: config.server.nodeEnv,
        timestamp: new Date().toISOString(),
        uptime: formatUptime(process.uptime()),
        services: { favorites: null },
      },
    })
  }
})

export default router

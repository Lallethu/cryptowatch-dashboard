import { applyMiddleware } from './config/server.js'
import { config } from './config/index.js'
import { requestLogger } from './middleware/requestLogger.js'
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js'
import apiRouter from './routes/index.js'
import express from 'express'

const app = express()

app.use(requestLogger)
applyMiddleware(app)

app.use('/api', apiRouter)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(config.server.port, () => {
  console.info(`Server running on port: ${config.server.port}`)
  console.info(`Env: ${config.server.nodeEnv}`)
  console.info(`Ping check: http://localhost:${config.server.port}/api/ping`)
})

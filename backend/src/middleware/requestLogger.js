import morgan from 'morgan'
import { config } from '../config/index.js'

const format = config.server.isDev
  ? ':method :url :status :response-time ms - :res[content-length] bytes'
  : ':remote-addr :method :url :status :response-time ms'

export const requestLogger = morgan(format, {
  skip: req => req.url === '/health',
})

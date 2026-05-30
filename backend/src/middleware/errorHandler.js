import { config } from '../config/index.js'

export class AppError extends Error {
  constructor(message, statusCode = 500) {
	super(message)
	this.statusCode = statusCode
	this.isOperational = true
	Error.captureStackTrace(this, this.constructor)
  }
}

export const errors = {
  notFound: message => new AppError(message || 'Not found', 404),
  unauthorized: message => new AppError(message || 'Unauthorized', 401),
  forbidden: message => new AppError(message || 'Forbiden', 403),
  badRequest: message => new AppError(message || 'Invalid', 400),
  conflict: message => new AppError(message || 'Conflict', 409),
}

export const notFoundHandler = (req, _res, next) => {
  next(errors.notFound(`Undefined route : ${req.method} ${req.url}`))
}

export const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500
  const isOperational = err.isOperational || false

  if (statusCode >= 500) {
	console.error('Server error:', {
	  message: err.message,
	  stack: config.server.isDev ? err.stack : undefined,
	  url: req.url,
	  method: req.method,
	})
  }

  res.status(statusCode).json({
	success: false,
	error: {
	  message: err.message,
	  ...(config.server.isDev && !isOperational && { stack: err.stack }),
	},
  })
}

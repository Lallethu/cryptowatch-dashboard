import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import cookieParser from 'cookie-parser'
import { config } from './index.js'

export const applyMiddleware = app => {
  app.use(helmet())

  app.use(
    cors({
      origin: config.server.isDev
        ? [config.client.url, 'http://localhost:4200']
        : config.client.url,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )

  app.use(express.json({ limit: '10kb' }))
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
}

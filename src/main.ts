import dotenv from 'dotenv'
import express from 'express'
import compression from 'compression'
import logger from './modules/logger.js'
import { createExpressServer } from 'routing-controllers'
import { connectDataBase } from './connectDataBase.js'
import controllers from './controllers/index.js'
import config from './config.js'

// const PORT = config['PORT']
const PORT = 4000
const app = createExpressServer({
  routePrefix: '/api',
  controllers: [...controllers],
})

app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

try {
  app.listen(PORT)
  connectDataBase()
  logger.info(`Server started successfully - port: ${PORT}`)
  logger.info(`http://localhost:${PORT}`)
} catch (error) {
  logger.error(`Unable to connect to the server:, ${error}`)
}

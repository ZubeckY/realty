import dotenv from 'dotenv'
import express from 'express'
import compression from 'compression'
import logger from './modules/logger.js'
import { createExpressServer } from 'routing-controllers'
import { AgencyController } from './controllers/agency-controller.js'
import { UserController } from './controllers/user-controller.js'

dotenv.config()

const PORT = process.env.PORT || 4000
const app = createExpressServer({
  routePrefix: '/api',
  controllers: [AgencyController, UserController],
})

app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

try {
  app.listen(PORT)
  logger.info(`Server started successfully - port: ${PORT}`)
  logger.info(`http://localhost:${PORT}`)
} catch (error) {
  logger.error(`Unable to connect to the server:, ${error}`)
}

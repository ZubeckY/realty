import 'reflect-metadata'
import * as express from 'express'
import compression from 'compression'
import logger from './modules/logger.js'
import { createExpressServer } from 'routing-controllers'
import { connectDataBase } from './connectDataBase.js'
import controllers from './controllers/index.js'
import config from './config.js'

const { PORT } = config
const app = createExpressServer({
  routePrefix: '/api',
  controllers: [...controllers],
})

app.set('trust proxy', true)
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function start() {
  try {
    app.listen(PORT)
    connectDataBase()
    logger.info(`Server started successfully`)
    logger.info(`${config.CLIENT_URL}:${PORT}`)
  } catch (error) {
    logger.error(`Unable to connect to the server:, ${error}`)
  }
}

start()

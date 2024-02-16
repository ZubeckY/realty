import 'reflect-metadata'
import { DataSource } from 'typeorm'
import logger from './modules/logger.js'
import config from './config.js'

export const AppDataSource: DataSource = new DataSource({
  type: 'mysql',
  host: config.DB_HOST,
  port: 3306,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  entities: ['/entity/*.js'],
  synchronize: true,
  logging: false,
})

export function connectDataBase() {
  AppDataSource.initialize()
    .then(() => {
      logger.info(`DataBase connecting`)
    })
    .catch((error) => {
      logger.error(`DataBase error:, ${error}`)
    })
}

import 'reflect-metadata'
import { DataSource } from 'typeorm'
import logger from './modules/logger.js'

export const AppDataSource: DataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'test_realty',
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

import 'reflect-metadata'
import { DataSource } from 'typeorm'
import logger from './modules/logger.js'
import config from './config.js'

export const AppDataSource: DataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: 5432,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  entities: ["src/entity/**/*.ts"],
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

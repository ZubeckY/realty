import { Body, Controller, Get, Param, Params } from "routing-controllers";
import { AppDataSource } from '../connectDataBase'
import { Agency, News } from '../entity'

@Controller('/news')
export class NewsController {
  @Get('/list')
  async getNewsList(@Body('agency_id') agency_id: number) {
    try {
      const newsRepository = AppDataSource.getRepository(News)
      const agencyRepository = AppDataSource.getRepository(Agency)

      return await newsRepository.find({
        where: {
          agency: {
            id: agency_id
          }
        }
      })
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Get('/list-item/:id')
  async getNewsItem(@Params('id') id: number) {
    try {
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }
}

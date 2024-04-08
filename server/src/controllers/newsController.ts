import { Body, Delete, Get, JsonController, Param, Params, Patch, Post, Req, UseAfter } from 'routing-controllers'
import { AppDataSource } from '../connectDataBase.js'
import { Agency, News, User } from '../entity/index.js'
import { checkAuth } from '../middleware/checkAuth'

@UseAfter(checkAuth)
@JsonController('/news')
export class NewsController {
  @Post('/create/')
  async create(@Body() body: any) {
    try {
      const { agency, user, model } = body
      const userRepository = AppDataSource.getRepository(User)
      const newsRepository = AppDataSource.getRepository(News)
      const agencyRepository = AppDataSource.getRepository(Agency)

      const userFromDB = await userRepository.findOneBy({
        id: user.id,
      })

      if (!userFromDB) {
        return {
          message: 'Ошибка, пользователь не найден',
        }
      }

      const agencyFromDB = await agencyRepository.findOneBy({
        id: agency.id,
      })

      if (!agencyFromDB) {
        return {
          message: 'Ошибка, некорректное агентство',
        }
      }

      const { text, tags, youtube } = model
      const newsItem = new News()

      newsItem.text = text
      newsItem.youtube = youtube
      newsItem.tags = [...tags]
      newsItem.user = userFromDB
      newsItem.agency = agencyFromDB

      return await newsRepository.save(newsItem)
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Post('/list/')
  async getList(@Body() body: any) {
    try {
      const { agency_id } = body

      const newsRepository = AppDataSource.getRepository(News)
      const agencyRepository = AppDataSource.getRepository(Agency)

      const agencyFromDB = await agencyRepository.findOneBy({
        id: agency_id,
      })

      if (!agencyFromDB) {
        return {
          message: 'Ошибка, некорректное агентство',
        }
      }

      const { id } = agencyFromDB

      return await newsRepository
        .createQueryBuilder('news')
        .leftJoinAndSelect('news.user', 'user')
        .leftJoinAndSelect('news.agency', 'agency')
        .leftJoinAndSelect('news.images', 'images')
        .where('news.agency.id = :agencyId', { agencyId: id })
        .getMany()
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Get('/list/:id')
  async getOne(@Param('id') id: number | string) {
    try {
      if (!isNaN(+id)) {
        return {
          message: 'Передано некорректное значение',
        }
      }

      const newsRepository = AppDataSource.getRepository(News)
      const newsItemFromDB = await newsRepository.findOneBy({
        id: +id,
      })

      if (!newsItemFromDB) {
        return {
          message: 'Запись не найдена',
        }
      }

      return newsItemFromDB
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Patch('/patch/:id')
  async edit(@Req() req: any, @Body() body: any, @Param('id') id: number | string) {
    try {
      if (!isNaN(+id)) {
        return {
          message: 'Передано некорректное значение',
        }
      }
      const { model } = body

      const newsRepository = AppDataSource.getRepository(News)
      const newsItemFromDB = await newsRepository.findOneBy({
        id: +id,
      })

      if (!newsItemFromDB) {
        return {
          message: 'Запись не найдена',
        }
      }

      const { text, tags, youtube } = model
      newsItemFromDB.text = text ?? newsItemFromDB.text
      newsItemFromDB.youtube = youtube ?? newsItemFromDB.youtube
      newsItemFromDB.tags = [...tags] ?? newsItemFromDB.tags

      return await newsRepository.save(newsItemFromDB)
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number | string) {
    try {
      if (!isNaN(+id)) {
        return {
          message: 'Передано некорректное значение',
        }
      }

      const newsRepository = AppDataSource.getRepository(News)
      const newsItemFromDB = await newsRepository.findOneBy({
        id: +id,
      })

      if (!newsItemFromDB) {
        return {}
      }

      return await newsRepository.remove(newsItemFromDB)
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }
}

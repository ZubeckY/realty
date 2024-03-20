import { Body, Delete, Get, JsonController, Param, Params, Patch, Post, Req } from 'routing-controllers'
import { AppDataSource } from '../connectDataBase.js'
import { Agency, News, User } from '../entity/index.js'

@JsonController('/news')
export class NewsController {
  @Post('/create/')
  async createNews(@Body() body: any) {
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

      await newsRepository.save(newsItem)

      return {
        message: 'Новость успешно создана',
      }
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Get('/list/')
  async getNewsList(@Body() body: any) {
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

      return await newsRepository.find({
        where: {
          agency: {
            id: id,
          },
        },
      })
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Get('/list/:id')
  async getNewsListItem(@Param('id') id: number | string) {
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
  async editNews(@Req() req: any, @Body() body: any, @Param('id') id: number | string) {
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

      await newsRepository.save(newsItemFromDB)

      return {
        message: 'Успешно изменено',
      }
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Delete('/delete/:id')
  async deleteNews(@Param('id') id: number | string) {
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

      await newsRepository.remove(newsItemFromDB)

      return {
        message: 'Новость успешно удалена',
      }
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }
}

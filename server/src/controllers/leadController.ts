import { Body, Delete, Get, JsonController, Param, Params, Patch, Post, Req } from 'routing-controllers'
import { AppDataSource } from '../connectDataBase.js'
import { Agency, News, User, Lead, Client } from '../entity/index.js'

@JsonController('/lead')
export class NewsController {
  @Post('/create/')
  async createLead(@Body() body: any) {
    try {
      const { agency, user, client, lead } = body
      const userRepository = AppDataSource.getRepository(User)
      const leadRepository = AppDataSource.getRepository(Lead)
      const clientRepository = AppDataSource.getRepository(Client)
      const agencyRepository = AppDataSource.getRepository(Agency)

      const agencyFromDB = await agencyRepository.findOneBy({
        id: agency.id,
      })

      if (!agencyFromDB) {
        return {
          message: 'Ошибка, некорректное агентство',
        }
      }

      const userFromDB = user
        ? await userRepository.findOneBy({
            id: user.id,
          })
        : null

      let clientFinal: any = {}

      const clientFromDB = await clientRepository.findOneBy({
        fullName: client.fullName,
        phone: client.phone,
      })

      if (!clientFromDB) {
        clientFinal = new Client()
        clientFinal.fullName = client.fullName
        clientFinal.phone = client.phone
        clientFinal.company = client.company ?? ''
        clientFinal.comment = client.comment ?? ''

        await clientRepository.save(clientFinal)
      } else {
        clientFinal = clientFromDB
      }

      const leadCreate = new Lead()

      leadCreate.stage = 'new'
      leadCreate.comment = lead.comment
      leadCreate.client = clientFinal
      leadCreate.manager = userFromDB

      return await leadRepository.save(leadCreate)
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
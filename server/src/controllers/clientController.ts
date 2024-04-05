import { Body, Delete, Get, JsonController, Param, Params, Patch, Post, Req, UseAfter } from "routing-controllers";
import { AppDataSource } from '../connectDataBase.js'
import { Agency, News, User, Lead, Client } from '../entity/index.js'
import { checkAuth } from "../middleware/checkAuth"

@UseAfter(checkAuth)
@JsonController('/client')
export class ClientController {
  @Post('/list/')
  async getList(@Body() body: any) {
    try {
      const { agency_id } = body

      const clientRepository = AppDataSource.getRepository(Client)
      const agencyRepository = AppDataSource.getRepository(Agency)

      const agencyFromDB = await agencyRepository.findOneBy({
        id: +agency_id,
      })

      if (!agencyFromDB) {
        return {
          message: 'Ошибка, некорректное агентство',
        }
      }

      const { id } = agencyFromDB

      return await clientRepository.find({
        where: {
          agency: {
            id: id
          }
        }
      })
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

      const leadRepository = AppDataSource.getRepository(Lead)
      const newsItemFromDB = await leadRepository.findOneBy({
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

  @Post('/create/')
  async create(@Body() body: any) {
    try {
      const { agency, user, client } = body
      const userRepository = AppDataSource.getRepository(User)
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

      if (!userFromDB) {
        return {
          message: 'Пользователь указан неверно'
        }
      }

      const clientFromDB = await clientRepository.findOneBy({
        fullName: client.fullName,
        phone: client.phone,
        agency: {
          id: agencyFromDB.id
        }
      })

      if (clientFromDB) {
        return {
          message: 'Такой пользователь уже есть'
        }
      }

      const createClient = new Client()
      createClient.fullName = client.fullName
      createClient.phone = client.phone
      createClient.company = client.company
      createClient.comment = client.comment
      createClient.agency = agencyFromDB

      return await clientRepository.save(createClient)
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

      const leadRepository = AppDataSource.getRepository(Lead)
      const newsItemFromDB = await leadRepository.findOneBy({
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

      await leadRepository.save(newsItemFromDB)

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

      const leadRepository = AppDataSource.getRepository(Lead)
      const newsItemFromDB = await leadRepository.findOneBy({
        id: +id,
      })

      if (!newsItemFromDB) {
        return {}
      }

      await leadRepository.remove(newsItemFromDB)

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

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
      const { agencyID } = body

      const clientRepository = AppDataSource.getRepository(Client)
      const agencyRepository = AppDataSource.getRepository(Agency)

      const agencyFromDB = await agencyRepository.findOneBy({
        id: +agencyID,
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
        message: 'Ошибка сервера',
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
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Post('/create/')
  async create(@Body() body: any) {
    try {
      const { agency, user, client } = body
      const leadRepository = AppDataSource.getRepository(Lead)
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

      const newClient = await clientRepository.save(createClient)

      const createLead = new Lead()
      createLead.status = 'new_client'
      createLead.client = newClient
      createLead.agency = agencyFromDB

      await leadRepository.save(createLead)

      return true

    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  // @Patch('/patch/:id')
  // async edit(@Req() req: any, @Body() body: any, @Param('id') id: number | string) {
  //   try {
  //     if (!isNaN(+id)) {
  //       return {
  //         message: 'Передано некорректное значение',
  //       }
  //     }
  //     const { model } = body
  //
  //     const leadRepository = AppDataSource.getRepository(Lead)
  //     const newsItemFromDB = await leadRepository.findOneBy({
  //       id: +id,
  //     })
  //
  //     if (!newsItemFromDB) {
  //       return {
  //         message: 'Запись не найдена',
  //       }
  //     }
  //
  //     const { text, tags, youtube } = model
  //     newsItemFromDB.text = text ?? newsItemFromDB.text
  //     newsItemFromDB.youtube = youtube ?? newsItemFromDB.youtube
  //     newsItemFromDB.tags = [...tags] ?? newsItemFromDB.tags
  //
  //     await leadRepository.save(newsItemFromDB)
  //
  //     return {
  //       message: 'Успешно изменено',
  //     }
  //   } catch (e) {
  //     return {
  //       message: 'Ошибка сервера',
  //       error: e,
  //     }
  //   }
  // }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number | string) {
    try {
      if (!isNaN(+id)) {
        return {
          message: 'Передано некорректное значение',
        }
      }

      const leadRepository = AppDataSource.getRepository(Lead)
      const clientRepository = AppDataSource.getRepository(Client)
      const clientFromDB = await clientRepository.findOneBy({
        id: +id,
      })

      if (!clientFromDB) {
        return {
          message: 'Клинет не найден'
        }
      }

      const leadFromDB = await leadRepository.findOneBy({
        client: {
          id: clientFromDB.id
        }
      })

      if (leadFromDB) {
        await leadRepository.remove(leadFromDB)
      }

      return await clientRepository.remove(clientFromDB)
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }
}

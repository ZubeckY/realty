import { Body, Delete, Get, JsonController, Param, Post, UseAfter } from 'routing-controllers'
import { Agency, User, Lead, Client } from '../entity/index.js'
import { checkAuth } from '../middleware/checkAuth.js'
import { AppDataSource } from '../connectDataBase.js'

@UseAfter(checkAuth)
@JsonController('/lead')
export class LeadController {
  @Post('/list/')
  async getList(@Body() body: any) {
    try {
      const { agencyID } = body

      const leadRepository = AppDataSource.getRepository(Lead)
      const agencyRepository = AppDataSource.getRepository(Agency)

      const agencyFromDB = await agencyRepository.findOneBy({
        id: agencyID,
      })

      if (!agencyFromDB) {
        return {
          message: 'Ошибка, некорректное агентство',
        }
      }

      const { id } = agencyFromDB

      return await leadRepository
        .createQueryBuilder('lead')
        .leftJoinAndSelect('lead.client', 'client')
        .leftJoinAndSelect('lead.agency', 'agency')
        .where('lead.agency.id = :agencyId', { agencyId: id })
        .getMany()
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

      if (!client) {
        clientFinal = null
      } else {
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
      }

      const leadCreate = new Lead()

      leadCreate.stage = lead.stage ?? 'new_client'
      leadCreate.realtyType = lead.realtyType
      leadCreate.district = lead.district
      leadCreate.microDistrict = lead.microDistrict
      leadCreate.objectReadiness = lead.objectReadiness
      leadCreate.purposeOfPurchase = lead.purposeOfPurchase
      leadCreate.paymentMethod = lead.paymentMethod
      leadCreate.comment = lead.comment
      leadCreate.manager = lead.manager
      leadCreate.user = lead.user
      leadCreate.client = clientFinal
      leadCreate.agency = agencyFromDB

      return await leadRepository.save(leadCreate)
    } catch (e) {
      console.log(e)
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  // @Patch('/patch/:id')
  // async editNews(@Req() req: any, @Body() body: any, @Param('id') id: number | string) {
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
      const leadFromDB = await leadRepository.findOneBy({
        id: +id,
      })

      if (!leadFromDB) {
        return {
          message: 'Лид не найден',
        }
      }

      const clientID: number = leadFromDB!.client!.id

      const clientFromDB = await clientRepository.findOneBy({
        id: clientID,
      })

      if (clientFromDB) {
        await clientRepository.remove(clientFromDB)
      }

      return await leadRepository.remove(leadFromDB)
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }
}

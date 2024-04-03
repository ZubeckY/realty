import 'reflect-metadata'
import { Param, Body, Get, Post, Put, Delete, OnUndefined, JsonController, UseAfter } from "routing-controllers"
import { Agency, Address, User, AgencyInvite } from '../entity/index.js'
import { AppDataSource } from '../connectDataBase.js'
import * as uuid from 'uuid'
import { agencyLegalFormTypeText } from "../types/agencyLegalForm"
import { Role, roleTypeText } from "../types/role"
import { checkAuth } from "../middleware/checkAuth"

@UseAfter(checkAuth)
@JsonController('/agency')
export class AgencyController {
  @Get('/list')
  async getList() {
    try {
      const agencyRepository = AppDataSource.getRepository(Agency)
      return await agencyRepository.find()
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Get('/list/:id')
  @OnUndefined(204)
  async getOne(@Param('id') id: number) {
    try {
      const agencyRepository = AppDataSource.getRepository(Agency)
      return await agencyRepository.findOneBy({
        id: +id,
      })
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Get('/legal-form/list')
  async getLegalFormList(){
    try {
      return agencyLegalFormTypeText
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Post('/create/')
  async createAgency(@Body() body: any) {
    try {
      const { agency, user, address } = body

      const userRepository = AppDataSource.getRepository(User)
      const agencyRepository = AppDataSource.getRepository(Agency)

      // ищем агентство по названию
      const agencyByTitle = await agencyRepository.findOneBy({
        title: agency.title,
      })

      // если агентство найдено
      if (agencyByTitle) {
        return {
          message: 'Агентство с таким названием уже существует.',
        }
      }

      // ищем агентство по email
      const agencyByEmail = agency?.email ? await agencyRepository.findOneBy({
        email: agency?.email,
      }) : null

      // если агентство найдено
      if (agencyByEmail) {
        return {
          message: 'Агентство с таким email уже существует.',
        }
      }

      // ищем агентство по инн
      const agencyByINN = await agencyRepository.findOneBy({
        inn: agency?.inn,
      })

      // если агентство найдено
      if (agencyByINN) {
        return {
          message: 'Агентство с таким ИНН уже существует.',
        }
      }

      // Пытаемся найти ползователя
      const userFromDB = await userRepository.findOneBy({
        id: user.id,
      })

      // если пользователь не найден
      if (!userFromDB) {
        return {
          message: 'Пользователя не существует',
        }
      }

      // Пытаемся найти агентство, которое зарегистрировано на данного пользователя
      const findAgencyByUser = await agencyRepository.findOneBy({
        ownerUser: user,
      })

      // Если у человека уже есть агентство, то выдаём ошибку.
      if (findAgencyByUser) {
        return {
          message: 'Данный пользователь уже имеет агентство.',
        }
      }

      // Пытаемся создать новое агентство
      const createAgency: Agency = new Agency()
      createAgency.title = agency!.title
      createAgency.inn = agency!.inn
      createAgency.email = agency?.email
      createAgency.ownerUser = agency!.ownerUser
      createAgency.legalForm = agency!.legalForm
      createAgency.inviteCode = uuid.v4()
      createAgency.ownerUser = user

      await agencyRepository.save(createAgency)

      // Добавляем, что данный пользователь имеет отношение к данной
      const userFromDBForAgency: User | null = await userRepository.findOneBy({
        id: user.id,
      })

      if (!userFromDBForAgency) {
        return {
          message: 'Ошибка, пользователь не найден',
        }
      }

      userFromDBForAgency.agency = createAgency
      userFromDBForAgency.role = Role.ADMIN
      await userRepository.save(userFromDBForAgency)

      return {
        user: userFromDBForAgency,
        agency: createAgency,
      }
    } catch (e) {
      console.log(e)
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  /* invite */
  @Post('/invite/list/')
  async getInviteList(@Body() body: any) {
    try {
      const { agency } = body
      const agencyInviteRepository = AppDataSource.getRepository(AgencyInvite)

      return await agencyInviteRepository.find({
        where: {
          agency: {
            id: agency.id,
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

  @Post('/invite/create/:hash')
  async createInvite() {
    try {

      return true
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Post('/invite/accept/:hash')
  async acceptInvite() {
    try {
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Delete('/invite/reject/:hash')
  async rejectInvite() {
    try {
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }
}

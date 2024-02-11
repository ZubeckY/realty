import 'reflect-metadata'
import { Controller, Param, Body, Get, Post, Put, Delete, OnUndefined } from 'routing-controllers'
import { Agency, Address, User } from '../entity/index.js'
import { AppDataSource } from '../connectDataBase.js'

@Controller('/agency')
export class AgencyController {
  @Get('/:id')
  @OnUndefined(204)
  getOne(@Param('id') id: number) {
    try {
      const agencyRepository = AppDataSource.getRepository(Agency)
    } catch (e) {}
  }

  @Post('/create')
  async post(@Body() agency: Agency, @Body() user: User, @Body() address: Address) {
    try {
      const errorList = []
      const userRepository = AppDataSource.getRepository(User)
      const agencyRepository = AppDataSource.getRepository(Agency)

      // ищем агентство по названию
      const agencyByTitle = await agencyRepository.findOneBy({
        title: agency?.title,
      })

      // если агентство найдено
      if (agencyByTitle) {
        errorList.push({
          message: 'Агентство с таким названием уже существует.',
        })
      }

      // ищем агентство по email
      const agencyByEmail = await agencyRepository.findOneBy({
        email: agency?.email,
      })

      // если агентство найдено
      if (agencyByEmail) {
        errorList.push({
          message: 'Агентство с таким email уже существует.',
        })
      }

      // ищем агентство по инн
      const agencyByINN = await agencyRepository.findOneBy({
        inn: agency?.inn,
      })

      // если агентство найдено
      if (agencyByINN) {
        errorList.push({
          message: 'Агентство с таким ИНН уже существует.',
        })
      }

      // Пытаемся найти ползователя
      const findUser = await userRepository.findOneBy({
        id: user.id,
      })

      // если пользователь не найден
      if (!findUser) {
        errorList.push({
          message: 'Пользователя не существует',
        })
      }

      // Если ошибки набрались, прекращаем дальнейшие действия, и возращаем ошибку.
      if (errorList.length) {
        return errorList
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
      createAgency.phone = agency?.phone
      createAgency.email = agency?.email
      createAgency.ownerUser = agency!.ownerUser
      createAgency.legalForm = agency!.legalForm
      createAgency.IAgreeToTermsOfUse = agency!.IAgreeToTermsOfUse
      createAgency.IAgreeToPrivacyPolicy = agency!.IAgreeToPrivacyPolicy
      createAgency.ownerUser = user

      await agencyRepository.save(createAgency)

      // Добавляем, что данный пользователь имеет отношение к данной
      const findUserForAgency: User | null = await userRepository.findOneBy({
        id: user.id,
      })

      if (!findUserForAgency) {
        return {
          message: 'Ошибка, пользователь не найден',
        }
      }

      findUserForAgency.agency = createAgency
      await userRepository.save(findUserForAgency)

      return {
        user: findUserForAgency,
        agency: createAgency,
      }
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() user: any) {
    return 'Updating a user...'
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return 'Removing user...'
  }
}

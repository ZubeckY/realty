import * as uuid from "uuid";
import { Body, Delete, Get, JsonController, Param, Post, UseAfter } from "routing-controllers";
import { Address, Agency, AgencyInvite, User } from "../entity/index.js";
import { agencyLegalFormTypeText } from "../types/agencyLegalForm";
import { AppDataSource } from "../connectDataBase.js";
import { checkAuth } from "../middleware/checkAuth";
import MailService from "../service/mailService";
import { Role } from "../types/role";

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
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Get('/list/:id')
  async getOne(@Param('id') id: number) {
    try {
      const agencyRepository = AppDataSource.getRepository(Agency)
      return await agencyRepository.findOneBy({
        id: +id,
      })
    } catch (e) {
      return {
        message: 'Ошибка сервера',
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
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Post('/create/')
  async createAgency(@Body() body: any) {
    try {
      const { agency, user } = body

      const { address } = agency

      const userRepository = AppDataSource.getRepository(User)
      const agencyRepository = AppDataSource.getRepository(Agency)
      const addressRepository = AppDataSource.getRepository(Address)

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

      const createAddress = new Address()
      createAddress.region = address.region
      createAddress.regionId = address.regionId
      createAddress.city = address.city
      createAddress.cityId = address.cityId
      createAddress.street = address.street
      createAddress.number = address.number

      const saveAddress = await addressRepository.save(createAddress)

      // Пытаемся создать новое агентство
      const createAgency: Agency = new Agency()
      createAgency.title = agency!.title
      createAgency.inn = agency!.inn
      createAgency.email = agency?.email
      createAgency.ownerUser = agency!.ownerUser
      createAgency.legalForm = agency!.legalForm
      createAgency.inviteCode = uuid.v4()
      createAgency.ownerUser = user
      createAgency.address = saveAddress

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
      return {
        message: 'Ошибка сервера',
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

      return await agencyInviteRepository
        .createQueryBuilder('agencyInvite')
        .leftJoinAndSelect('agencyInvite.user', 'user')
        .leftJoinAndSelect('agencyInvite.agency', 'agency')
        .where('agencyInvite.agency.id = :agencyId', { agencyId: agency.id })
        .getMany();
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Post('/invite/create/:hash')
  async createInvite(@Body() body: any, @Param('hash') hash: string) {
    try {
      const { user } = body
      const userRepository = AppDataSource.getRepository(User)
      const agencyRepository = AppDataSource.getRepository(Agency)
      const inviteRepository = AppDataSource.getRepository(AgencyInvite)

      const userFromDB = await userRepository.findOneBy({
        id: user.id
      })

      if (!userFromDB) {
        return {
          message: 'Пользователь указан неверно'
        }
      }

      const agencyFromDB = await agencyRepository.findOneBy({
        inviteCode: hash
      })

      if (!agencyFromDB) {
        return {
          message: 'Агентство не найдено'
        }
      }

      const invite = new AgencyInvite()
      invite.user = userFromDB
      invite.agency = agencyFromDB
      invite.hash = uuid.v4() + '-' + uuid.v4()

      await inviteRepository.save(invite)

      await new MailService().sendUserMailInviteCreated(userFromDB.email, agencyFromDB.title)

      return true
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Post('/invite/accept/:hash')
  async acceptInvite(@Param('hash') hash: string) {
    try {
      const userRepository = AppDataSource.getRepository(User)
      const agencyRepository = AppDataSource.getRepository(Agency)
      const inviteRepository = AppDataSource.getRepository(AgencyInvite)

      const inviteFromDB = await inviteRepository
        .createQueryBuilder('agencyInvite')
        .leftJoinAndSelect('agencyInvite.user', 'user')
        .leftJoinAndSelect('agencyInvite.agency', 'agency')
        .where('agencyInvite.hash = :agencyHash', { agencyHash: hash })
        .getOne();

      if (!inviteFromDB) {
        return {
          message: 'Приглашение не найдено'
        }
      }

      const userFromDB = await userRepository.findOneBy({
        id: inviteFromDB.user.id
      })

      if (!userFromDB) {
        return {
          message: 'Пользовател был указан неверно'
        }
      }

      const agencyFromDB = await agencyRepository.findOneBy({
        id: inviteFromDB.agency.id
      })

      if (!agencyFromDB) {
        return {
          message: 'Агентство было указано неверно'
        }
      }

      userFromDB.agency = agencyFromDB
      userFromDB.role = Role.MANAGER

      await userRepository.save(userFromDB)
      await new MailService().sendUserMailInviteAccepted(userFromDB.email, agencyFromDB.title)

      await inviteRepository.remove(inviteFromDB)
      return true
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Delete('/invite/reject/:hash')
  async rejectInvite(@Param('hash') hash: string) {
    try {
      const inviteRepository = AppDataSource.getRepository(AgencyInvite)
      const inviteFromDB = await inviteRepository
        .createQueryBuilder('agencyInvite')
        .leftJoinAndSelect('agencyInvite.user', 'user')
        .leftJoinAndSelect('agencyInvite.agency', 'agency')
        .where('agencyInvite.hash = :agencyHash', { agencyHash: hash })
        .getOne();

      if (!inviteFromDB) {
        return {
          message: 'Приглашение не найдено'
        }
      }

      await new MailService().sendUserMailInviteRejected(inviteFromDB.user.email, inviteFromDB.agency.title)
      await inviteRepository.remove(inviteFromDB)
      return true
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }
}

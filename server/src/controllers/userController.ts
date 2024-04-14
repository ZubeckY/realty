import { Param, Body, Get, Post, Put, Delete, UseAfter, JsonController, Req } from 'routing-controllers'
import { checkAuth } from '../middleware/checkAuth.js'
import { AppDataSource } from '../connectDataBase.js'
import { Role, roleTypeText } from '../types/role.js'
import TokenService from '../service/tokenService.js'
import { User } from '../entity/index.js'

@UseAfter(checkAuth)
@JsonController('/user')
export class UserController {
  @Get('/:id')
  async getOne(@Param('id') id: number) {
    try {
      const userRepository = AppDataSource.getRepository(User)
      return await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.photo', 'photo')
        .leftJoinAndSelect('user.address', 'address')
        .leftJoinAndSelect('user.agency', 'agency')
        .where('user.id = :userId', { userId: id })
        .getOne()
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Post('/list/agency/:id')
  async getAll(@Req() req: any, @Param('id') id: number) {
    try {
      const { crm_authorized }: any = req.headers
      const userRepository = AppDataSource.getRepository(User)
      const token = crm_authorized.split('crm_auth_token ')[1]
      if (!token) {
        return {
          message: 'Ошибка, токен невалиден',
        }
      }

      const data: any = new TokenService().validateAccessToken(token)
      const currentUserFromDB = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.agency', 'agency')
        .where('user.id = :userId', { userId: data.id })
        .getOne()

      if (!currentUserFromDB) {
        return {
          message: 'Пользователь не найден',
        }
      }

      if (currentUserFromDB?.agency?.id !== id) {
        return {
          message: 'Пользователь не состоит в агентстве',
        }
      }

      return await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.photo', 'photo')
        .leftJoinAndSelect('user.agency', 'agency')
        .where('user.agency.id = :agencyId', { agencyId: id })
        .orderBy('user.role', 'ASC')
        .getMany()
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Post('/list/binding/:id')
  async getAllToBinding(@Req() req: any, @Param('id') id: number) {
    try {
      const { crm_authorized }: any = req.headers
      const userRepository = AppDataSource.getRepository(User)
      const token = crm_authorized.split('crm_auth_token ')[1]
      if (!token) {
        return {
          message: 'Ошибка, токен невалиден',
        }
      }

      const data: any = new TokenService().validateAccessToken(token)
      const currentUserFromDB = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.agency', 'agency')
        .where('user.id = :userId', { userId: data.id })
        .getOne()

      if (!currentUserFromDB) {
        return {
          message: 'Пользователь не найден',
        }
      }

      if (currentUserFromDB?.agency?.id !== id) {
        return {
          message: 'Пользователь не состоит в агентстве',
        }
      }

      const userList = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.photo', 'photo')
        .leftJoinAndSelect('user.agency', 'agency')
        .where('user.agency.id = :agencyId', { agencyId: id })
        .orderBy('user.role', 'ASC')
        .getMany()

      const newList: any = []
      const adminList = userList.filter((user) => user.role === Role.ADMIN)
      const officeManagerList = userList.filter((user) => user.role === Role.OFFICE_MANAGER)
      const ropList = userList.filter((user) => user.role === Role.ROP)
      const managerList = userList.filter((user) => user.role === Role.MANAGER)

      const getRoleTypeText = (role: any) => {
        // @ts-ignore
        return roleTypeText[role]
      }

      if (adminList.length) {
        const header: any = [{ header: getRoleTypeText(Role.ADMIN) }]
        const divider: any = [{ divider: true }]

        newList.push(...header)
        newList.push(...adminList)
        newList.push(...divider)
      }
      if (officeManagerList.length) {
        const header: any = [{ header: getRoleTypeText(Role.OFFICE_MANAGER) }]
        const divider: any = [{ divider: true }]

        newList.push(...header)
        newList.push(...officeManagerList)
        newList.push(...divider)
      }
      if (ropList.length) {
        const header: any = [{ header: getRoleTypeText(Role.ROP) }]
        const divider: any = [{ divider: true }]

        newList.push(...header)
        newList.push(...ropList)
        newList.push(...divider)
      }
      if (managerList.length) {
        const header: any = [{ header: getRoleTypeText(Role.MANAGER) }]

        newList.push(...header)
        newList.push(...managerList)
      }

      return newList
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Post('/change-wallpapers/')
  async changeWallpaper(@Body() body: any) {
    try {
      const { wallpapers, userId } = body
      const userRepository = AppDataSource.getRepository(User)
      const userFromDB = await userRepository.findOneBy({
        id: userId,
      })

      if (!userFromDB) {
        return {
          message: 'Пользователь не найден',
        }
      }

      userFromDB.wallpapers = wallpapers

      return await userRepository.save(userFromDB)
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Post('/')
  post(@Body() user: any) {
    try {
    } catch (e) {}
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() user: any) {
    try {
    } catch (e) {}
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    try {
    } catch (e) {}
  }
}

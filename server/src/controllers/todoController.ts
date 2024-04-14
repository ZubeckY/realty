import { Body, JsonController, Post, Req, UseAfter } from 'routing-controllers'
import { checkAuth } from '../middleware/checkAuth'
import { AppDataSource } from '../connectDataBase'
import TokenService from '../service/tokenService'
import { Agency, Todo, User } from '../entity'
import { Role } from '../types/role'

@UseAfter(checkAuth)
@JsonController('/todo')
export class TodoController {
  @Post('/create')
  async createOne(@Body() body: any) {
    try {
      const { model, agency } = body
      const { user, manager, comment, stage } = model

      const userRepository = AppDataSource.getRepository(User)
      const todoRepository = AppDataSource.getRepository(Todo)
      const agencyRepository = AppDataSource.getRepository(Agency)

      const userFromDB = await userRepository.findOneBy({
        id: user,
      })

      if (!userFromDB) {
        return {
          message: 'Пользователь не найден',
        }
      }

      const managerFromDB = await userRepository.findOneBy({
        id: manager,
      })

      if (!managerFromDB) {
        return {
          message: 'Менеджер не найден',
        }
      }

      const agencyFromDB = await agencyRepository.findOneBy({
        id: agency.id,
      })

      if (!agencyFromDB) {
        return {
          message: 'Некорректное агентство',
        }
      }

      const createTodo = new Todo()
      createTodo.stage = stage
      createTodo.comment = comment
      createTodo.user = userFromDB
      createTodo.manager = managerFromDB
      createTodo.agency = agencyFromDB

      return await todoRepository.save(createTodo)
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Post('/list')
  async getList(@Req() req: any, @Body() body: any) {
    try {
      const { agencyID } = body
      const { crm_authorized }: any = req.headers

      const userRepository = AppDataSource.getRepository(User)
      const todoRepository = AppDataSource.getRepository(Todo)

      const token = crm_authorized.split('crm_auth_token ')[1]
      if (!token) {
        return {
          message: 'Ошибка, токен невалиден',
        }
      }

      const data = new TokenService().validateAccessToken(token)
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

      if (currentUserFromDB?.agency?.id !== agencyID) {
        return {
          message: 'Пользователь не состоит в агентстве',
        }
      }

      const currentRoleHigh = () => {
        return [Role.ADMIN, Role.ROP, Role.OFFICE_MANAGER].includes(currentUserFromDB.role)
      }

      if (!currentRoleHigh()) {
        return await todoRepository
          .createQueryBuilder('todo')
          .leftJoinAndSelect('todo.user', 'user')
          .leftJoinAndSelect('todo.agency', 'agency')
          .leftJoinAndSelect('todo.manager', 'manager')
          .where('todo.agency.id = :agencyId', { agencyId: agencyID })
          .andWhere('todo.user.id = :userId', { userId: currentUserFromDB.id })
          .getMany()
      }

      const currentUserIsAdmin = () => {
        return [Role.ADMIN].includes(currentUserFromDB.role)
      }

      if (!currentUserIsAdmin()) {
        return await todoRepository
          .createQueryBuilder('todo')
          .leftJoinAndSelect('todo.user', 'user')
          .leftJoinAndSelect('todo.agency', 'agency')
          .leftJoinAndSelect('todo.manager', 'manager')
          .where('todo.agency.id = :agencyId', { agencyId: agencyID })
          .andWhere('todo.user.id = :userId', { userId: currentUserFromDB.id })
          .orWhere('todo.manager.id = :managerId', { managerId: currentUserFromDB.id })
          .andWhere('todo.agency.id = :agencyId', { agencyId: agencyID })
          .getMany()
      }

      return await todoRepository
        .createQueryBuilder('todo')
        .leftJoinAndSelect('todo.user', 'user')
        .leftJoinAndSelect('todo.agency', 'agency')
        .leftJoinAndSelect('todo.manager', 'manager')
        .where('todo.agency.id = :agencyId', { agencyId: agencyID })
        .getMany()
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }
}

import { AppDataSource } from '../connectDataBase.js'
import TokenService from '../service/tokenService.js'
import { User } from '../entity/index.js'
import { Role } from '../types/role.js'
import { Repository } from 'typeorm'

export class checkRole {
  tokenService: TokenService = new TokenService()
  userRepository: Repository<User> = AppDataSource.getRepository(User)

  // Ставится на общие запросы, проверяет допуск всех ролей, кроме BLOCK и UNKNOWN
  async CHECK_ROLE(req: any, res: any, next: (err?: any) => any) {
    try {
      // Получаем токен с header-ов
      const { authorization } = req.headers
      if (!authorization) {
        return res.send({
          message: 'Нет токена',
        })
      }

      // Получаем токин со строки
      const token = authorization.split(' ')[1]
      if (!token) {
        return res.send({
          message: 'Нет токена',
        })
      }

      // Проверяем токен на валидность
      const userData: any = this.tokenService.validateAccessToken(token)
      if (!userData) {
        return res.send({
          message: 'Не валидная авторизация',
        })
      }

      // Ищем пользователя, который был в токене
      const findUser = await this.userRepository.findOneBy({
        id: userData.id,
      })
      if (!findUser) {
        return res.send({
          message: 'Пользователь не найден',
        })
      }

      // Проверяем роль
      switch (findUser.role) {
        case Role.ADMIN:
        case Role.MANAGER:
        case Role.OFFICE_MANAGER:
        case Role.ROP:
          return next()
        case Role.UNKNOWN:
          return res.send({
            message: 'Недопустимая роль, обратитесь к агентству',
          })
        case Role.BLOCK:
          return res.send({
            message: 'Недопустимая роль, вы не можете совершать данное действие',
          })
        default:
          return res.send({
            message: 'Ошибка получения роли',
          })
      }
    } catch (e) {
      return res.send({
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      })
    }
  }

  async CHECK_ADMIN(req: any, res: any, next: (err?: any) => any) {
    try {
    } catch (e) {
      return res.send({
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      })
    }
  }
}

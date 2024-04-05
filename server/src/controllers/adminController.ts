// @ts-ignore
import { Body, JsonController, Post, UseAfter } from "routing-controllers"
import { checkAuth } from "../middleware/checkAuth"
import { AppDataSource } from "../connectDataBase"
import { User } from "../entity"
import * as bcrypt from "bcrypt"

@UseAfter(checkAuth)
@JsonController("/admin")
export class AdminController {

  @Post("/login/")
  async login(@Body() body: any) {
    try {
      const { email, password } = body.model
      const userRepository = AppDataSource.getRepository(User)

      const userFromDB: User | null = await userRepository.findOneBy({
        email: email,
      })

      if (!userFromDB) {
        return {
          message: 'Пользователь с таким email не найден',
        }
      }

      const savedPassword = JSON.parse(JSON.stringify(userFromDB.password))
      const isCodeEquals = await bcrypt.compare(password, savedPassword)
      if (!isCodeEquals) {
        return {
          message: 'Неверный пароль',
        }
      }

      return true
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }
}
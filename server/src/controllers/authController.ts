import { Body, Get, JsonController, Post } from 'routing-controllers'
import { AppDataSource } from '../connectDataBase.js'
import TokenService from '../service/tokenService.js'
import { Agency, User } from '../entity/index.js'
import AuthDto from '../dtos/authDto.js'
import * as bcrypt from 'bcrypt'
import * as uuid from 'uuid'

// @ts-ignore
@JsonController('/auth')
export class AuthController {
  @Post('/user-exist/')
  async userExist(@Body() email: string) {
    try {
      const userRepository = AppDataSource.getRepository(User)
      const emailExists: User | null = await userRepository.findOneBy({
        email: email,
      })

      return !!emailExists
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Post('/reg/')
  async reg(@Body() data: any) {
    try {
      const userRepository = AppDataSource.getRepository(User)
      const { firstName, lastName, email, password } = data.model

      const emailExists: User | null = await userRepository.findOneBy({
        email: email,
      })

      if (!!emailExists) {
        return {
          message: 'Пользователь с таким email уже существует!',
        }
      }

      const activationLink = uuid.v4() + '-' + uuid.v4()
      const user = new User()

      user.firstName = firstName
      user.lastName = lastName
      user.email = email
      user.password = await bcrypt.hash(password, 3)

      const userDto = new AuthDto(user)
      const tokens = new TokenService().generateTokens({ ...userDto })

      console.log(tokens)

      return tokens

      // await userRepository.save(user)
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Get('/activate-account/:hash')
  async activate() {
    try {
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Post('/login/')
  async login() {
    try {
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }
}

import { Body, Get, JsonController, Param, Post } from 'routing-controllers'
import { AppDataSource } from '../connectDataBase.js'
import TokenService from '../service/tokenService.js'
import MailService from '../service/mailService.js'
import OTPService from '../service/OTPService.js'
import { User } from '../entity/index.js'
import AuthDto from '../dtos/authDto.js'
import * as bcrypt from 'bcrypt'
import * as uuid from 'uuid'

// @ts-ignore
@JsonController('/auth')
export class AuthController {
  @Post('/reg/')
  async registration(@Body() data: any) {
    try {
      const userRepository = AppDataSource.getRepository(User)
      const { firstName, lastName, email, password, IAgreeToTermsOfUse, IAgreeToPrivacyPolicy } = data.model

      const emailExists: User | null = await userRepository.findOneBy({
        email: email,
      })

      if (!!emailExists) {
        return {
          message: 'Пользователь с таким email уже существует!',
        }
      }

      const activationCode: string = new OTPService().generate()
      const activationLink: string = uuid.v4() + '-' + uuid.v4()

      const user = new User()

      user.firstName = firstName
      user.lastName = lastName
      user.email = email
      user.password = await bcrypt.hash(password, 3)
      user.IAgreeToTermsOfUse = IAgreeToTermsOfUse
      user.IAgreeToPrivacyPolicy = IAgreeToPrivacyPolicy
      user.activationCode = await bcrypt.hash(activationCode, 1)
      user.activationLink = activationLink

      // Сохраняем нового пользователя
      await userRepository.save(user)

      // Отправляем код на email
      await new MailService().sendActivationCode(email, activationCode)

      return {
        linkHash: activationLink,
      }
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Post('/activate-code/')
  async activateByCode(@Body() data: any) {
    try {
      const { hash, otp } = data.model

      if (!hash) {
        return {
          message: 'Не валидный токен',
        }
      }

      const userRepository = AppDataSource.getRepository(User)
      const userFromDB = await userRepository.findOneBy({
        activationLink: hash,
      })

      if (!userFromDB) {
        return {
          message: 'Ошибка пользователя',
        }
      }

      const savedOTP = JSON.parse(JSON.stringify(userFromDB.activationCode))
      const isCodeEquals = await bcrypt.compare(otp, savedOTP)
      if (!isCodeEquals) {
        return {
          message: 'Не верный код',
        }
      }

      userFromDB.IsActivatedAccount = true
      await userRepository.save(userFromDB)

      return userFromDB
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Get('/activate-link/:hash')
  async activate(@Param('hash') hash: string) {
    try {
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Post('/activate-code-refresh/:hash')
  async refreshUserActivateCode(@Param('hash') hash: string) {
    try {
      const userRepository = AppDataSource.getRepository(User)
      const userFromDB = await userRepository.findOneBy({
        activationLink: hash,
      })

      if (!userFromDB) {
        return {
          message: 'Пользователь не найден',
        }
      }

      const activationCode: string = new OTPService().generate()

      userFromDB.activationCode = await bcrypt.hash(activationCode, 1)
      await userRepository.save(userFromDB)

      // Отправляем код на email
      await new MailService().sendActivationCode(userFromDB.email, activationCode)

      return true

    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Get('/activate-status/:hash')
  async activateStatus(@Param('hash') hash: string) {
    try {
      const userRepository = AppDataSource.getRepository(User)
      const userFromDB = await userRepository.findOneBy({
        activationLink: hash,
      })

      if (!userFromDB) {
        return {
          message: 'Пользователь не найден',
        }
      }

      return userFromDB.IsActivatedAccount
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Post('/login/')
  async login() {
    try {
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Post('/login-after-activations/:hash')
  async loginAfterActivations(@Param('hash') hash: string) {
    try {
      const userRepository = AppDataSource.getRepository(User)
      const userFromDB: User | null = await userRepository.findOneBy({
        activationLink: hash,
      })

      if (!userFromDB) {
        return {
          message: 'Ошибка, пользователь не найден'
        }
      }

      if (!userFromDB.IsActivatedAccount) {
        return {
          message: 'Пользователь не активирован'
        }
      }

      // Создаём токен
      const userDto = new AuthDto(userFromDB)
      return new TokenService().generateTokens({ ...userDto })

    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

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
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }
}

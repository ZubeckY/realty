import { Body, Get, JsonController, Param, Post, Req } from 'routing-controllers'
import { AppDataSource } from '../connectDataBase.js'
import SecurityService from '../service/securityService.js'
import TokenService from '../service/tokenService.js'
import MailService from '../service/mailService.js'
import OTPService from '../service/OTPService.js'
import { AuthToken, User } from '../entity/index.js'
import AuthDto from '../dtos/authDto.js'
import * as bcrypt from 'bcrypt'
import * as uuid from 'uuid'

// @ts-ignore
@JsonController('/auth')
export class AuthController {
  @Post('/get-my-devices/')
  async getAuthUserDevices(@Body() body: any) {
    try {
      const { id } = body

      if (!id) {
        return {
          message: 'Неверный id'
        }
      }

      const userRepository = AppDataSource.getRepository(User)
      const tokenRepository = AppDataSource.getRepository(AuthToken)

      const userFromDB: User | null = await userRepository.findOneBy({
        id: id,
      })

      if (!userFromDB) {
        return {
          message: 'Пользователь не найден'
        }
      }

      return await tokenRepository.find({
        where: {
          user: {
            id: id
          }
        }
      })

    } catch (e) {
      console.log(e);
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Post('/reg/')
  async registration(@Body() body: any) {
    try {
      const userRepository = AppDataSource.getRepository(User)
      const { firstName, lastName, email, password, IAgreeToTermsOfUse, IAgreeToPrivacyPolicy } = body.model

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

      await new MailService().sendWelcomeMail(email)
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

  @Post('/login/')
  async login(@Body() body: any) {
    try {
      const { model } = body

      const { email, password } = model

      const userRepository = AppDataSource.getRepository(User)
      const userFromDB = await userRepository.findOneBy({
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

      const activationCode: string = new OTPService().generate()
      const activationLink: string = uuid.v4() + '-' + uuid.v4()

      userFromDB.activationCode = await bcrypt.hash(activationCode, 1)
      userFromDB.activationLink = activationLink

      await userRepository.save(userFromDB)

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

  @Post('/login-after-activations/:hash')
  async loginAfterActivations(@Req() req: any, @Param('hash') hash: string) {
    try {
      const userRepository = AppDataSource.getRepository(User)
      const userFromDB: User | null = await userRepository.findOneBy({
        activationLink: hash,
      })

      if (!userFromDB) {
        return {
          message: 'Ошибка, пользователь не найден',
        }
      }

      if (!userFromDB.IsActivatedAccount) {
        return {
          message: 'Пользователь не активирован',
        }
      }

      // Убераем старые коды
      userFromDB.activationCode = ''
      userFromDB.activationLink = ''
      await userRepository.save(userFromDB)

      // Создаём токен
      const loginDevice: any = await new SecurityService().checkDeviceUser(req)

      const DTO = {
        id: userFromDB.id,
        email: userFromDB.email,

        ip: loginDevice.ip,
        device: loginDevice.device,
        userAgent: loginDevice.userAgent,
      }

      const userDto = new AuthDto(DTO)
      const tokens = new TokenService().generateTokens({ ...userDto })

      const { accessToken } = tokens

      if (!accessToken) {
        return {
          message: 'Ошибка создания токена',
        }
      }

      const model = {
        ip: loginDevice.ip,
        value: accessToken,
        device: loginDevice.device,
        userAgent: loginDevice.userAgent,
        user: userFromDB
      }

      await new TokenService().saveToken(model)
      const loginText: any = await new SecurityService().newLogin(req)

      // Отправляем email с уведомлением о новом входе
      await new MailService().sendSecurityMessage(userFromDB.email, loginText)

      return tokens
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Post('/user-exist/')
  async userExist(@Req() req: any, @Body() body: any) {
    try {
      const { email } = body

      const userRepository = AppDataSource.getRepository(User)
      const emailExists: User | null = await userRepository.findOneBy({
        email: email,
      })

      // await new SecurityService().checkCurrentUser(req)

      return !!emailExists
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Post('/valid-token/:hash')
  async validToken(@Param('hash') hash: string) {
    try {
      const userRepository = AppDataSource.getRepository(User)
      const tokenFromDB = await new TokenService().findToken(hash)

      if (!tokenFromDB) {
        return {
          message: 'Токен несуществует',
          auth: false,
        }
      }

      const tryValidToken: any = await new TokenService().validateAccessToken(hash)

      if (!tryValidToken) {
        return {
          message: 'Токен невалиден',
          auth: false,
        }
      }

      const { id } = tryValidToken
      if (!id) {
        return {
          message: 'Невалидный токен',
          auth: false,
        }
      }

      const userFromDB = await userRepository.findOneBy({
        id: id,
      })

      if (!userFromDB) {
        return {
          message: 'Пользователь указан неверно',
          auth: false,
        }
      }

      return {
        message: 'Успешно',
        auth: true,
        user: userFromDB,
      }
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Post('/logout/:hash')
  async logout(@Param('hash') hash: string) {
    try {
      return await new TokenService().removeToken(hash)
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  @Post('/activate-code/')
  async activateByCode(@Body() body: any) {
    try {
      const { hash, otp } = body.model

      if (!hash) {
        return {
          message: 'Невалидный токен',
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
          message: 'Неверный код',
        }
      }

      if (!userFromDB.IsActivatedAccount) {
        userFromDB.IsActivatedAccount = true
        await userRepository.save(userFromDB)
      }

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
      return true
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
}

import jwt from 'jsonwebtoken'
import { AuthToken, User } from '../entity/index.js'
import { AppDataSource } from '../connectDataBase.js'
import AuthDto from '../dtos/authDto.js'
import config from '../config.js'

export default class TokenService {
  generateTokens(payload: AuthDto) {
    try {
      const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn: '15s' })
      const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: '30s' })
      return {
        accessToken,
        refreshToken,
      }
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  validateAccessToken(token: any) {
    try {
      return jwt.decode(token)
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token: any) {
    try {
      return jwt.decode(token)
    } catch (e) {
      return null
    }
  }

  async saveToken(model: any) {
    try {
      const { ip, value, device, userAgent, user } = model

      const authTokenRepository = AppDataSource.getRepository(AuthToken)
      const tokenData = await authTokenRepository.findOneBy({
        ip: ip,
        user: user,
        device: device,
        userAgent: userAgent,
      })

      if (tokenData) {
        tokenData.value = value
        return await authTokenRepository.save(tokenData)
      }

      const createToken = new AuthToken()
      createToken.ip = ip
      createToken.value = value
      createToken.device = device
      createToken.userAgent = userAgent
      createToken.user = user

      return await authTokenRepository.save(createToken)
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  async findToken(token: string) {
    try {
      const authTokenRepository = AppDataSource.getRepository(AuthToken)
      const tokenFromDB = await authTokenRepository.findOneBy({
        value: token,
      })

      if (!tokenFromDB) {
        return null
      }

      return tokenFromDB
    } catch (e) {
      return null
    }
  }
}

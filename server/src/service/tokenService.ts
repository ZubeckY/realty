import jwt from 'jsonwebtoken'
import { AuthToken, User } from '../entity/index.js'
import { AppDataSource } from '../connectDataBase.js'
import AuthDto from '../dtos/authDto.js'
import { Repository } from 'typeorm'
import config from '../config.js'

export default class TokenService {
  authTokenRepository: Repository<AuthToken> = AppDataSource.getRepository(AuthToken)

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

  validateAccessToken(token: string) {
    try {
      return jwt.verify(token, config.JWT_ACCESS_SECRET)
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, config.JWT_REFRESH_SECRET)
    } catch (e) {
      return null
    }
  }

  async saveToken(user: User, token: string) {
    try {
      const tokenData = await this.authTokenRepository.findOneBy({
        user: user,
      })

      if (tokenData) {
        tokenData.value = token
        return await this.authTokenRepository.save(tokenData)
      }

      const createToken = new AuthToken()
      createToken.value = token
      createToken.user = user

      return await this.authTokenRepository.save(createToken)
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  async removeToken(token: string) {
    try {
      const findToken = await this.authTokenRepository.findOneBy({
        value: token,
      })

      if (!findToken) {
        return {
          message: 'None token',
        }
      }

      return await this.authTokenRepository.remove(findToken)
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }

  async findToken(token: string) {
    try {
      return await this.authTokenRepository.findOneBy({
        value: token,
      })
    } catch (e) {
      return null
    }
  }
}

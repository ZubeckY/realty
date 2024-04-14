import { Param, Body, Get, Post, Put, Delete, UseAfter, JsonController } from 'routing-controllers'
import { checkAuth } from '../middleware/checkAuth.js'
import { AppDataSource } from "../connectDataBase"
import { User } from "../entity"

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
  async getAll(@Param('id') id: number) {
    try {
      const userRepository = AppDataSource.getRepository(User)
      return await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.photo', 'photo')
        .leftJoinAndSelect('user.agency', 'agency')
        .where('user.agency.id = :agencyId', { agencyId: id })
        .getMany()
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
        id: userId
      })

      if (!userFromDB) {
        return {
          message: 'Пользователь не найден'
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

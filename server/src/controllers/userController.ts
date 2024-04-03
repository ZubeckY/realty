import 'reflect-metadata'
import { Param, Body, Get, Post, Put, Delete, UseAfter, JsonController } from 'routing-controllers'
import { checkAuth } from '../middleware/checkAuth.js'
import { AppDataSource } from "../connectDataBase"
import { User } from "../entity"

@UseAfter(checkAuth)
@JsonController('/user')
export class UserController {
  @Get('/')
  getAll() {
    try {
    } catch (e) {}
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    try {
      const userRepository = AppDataSource.getRepository(User)
      const userFromDB = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.photo', 'photo')
        .leftJoinAndSelect('user.address', 'address')
        .leftJoinAndSelect('user.agency', 'agency')
        .where('user.id = :userId', { userId: id })
        .getOne();

      return userFromDB ? userFromDB : null
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
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

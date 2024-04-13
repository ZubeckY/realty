import { Body, Delete, Get, JsonController, Param, Params, Patch, Post, Req, Res, UseAfter } from "routing-controllers";
import { AppDataSource } from '../connectDataBase.js'
import { Agency, News, User, File } from '../entity/index.js'
import { checkAuth } from '../middleware/checkAuth'
import { In } from "typeorm";

@UseAfter(checkAuth)
@JsonController('/news')
export class NewsController {
  @Post('/create/')
  async create(@Body() body: any) {
    try {
      const { agency, user, model } = body
      const fileRepository = AppDataSource.getRepository(File)
      const userRepository = AppDataSource.getRepository(User)
      const newsRepository = AppDataSource.getRepository(News)
      const agencyRepository = AppDataSource.getRepository(Agency)

      const userFromDB = await userRepository.findOneBy({
        id: user.id,
      })

      if (!userFromDB) {
        return {
          message: 'Ошибка, пользователь не найден',
        }
      }

      const agencyFromDB = await agencyRepository.findOneBy({
        id: agency.id,
      })

      if (!agencyFromDB) {
        return {
          message: 'Ошибка, некорректное агентство',
        }
      }

      const filesFromDB: any = model.filesFromDB
      const listID = []

      if (filesFromDB) {
        for (let i = 0; i < filesFromDB.length; i++) {
          const fileItem = filesFromDB[i]
          listID.push(fileItem.id)
        }
      }

      const { text, tags, youtube } = model
      const newsItem = new News()

      await fileRepository.update(
        { id: In(listID) },
        { usage: true, isPublished: true }
      )

      const listFilesFromDB = await fileRepository.find({
        where: {
          id: In(listID)
        }
      })

      newsItem.text = text
      newsItem.youtube = youtube
      newsItem.tags = tags
      newsItem.user = userFromDB
      newsItem.agency = agencyFromDB
      newsItem.images = listFilesFromDB

      return await newsRepository.save(newsItem)
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Post('/list/')
  async getList(@Body() body: any) {
    try {
      const { agency_id } = body

      const newsRepository = AppDataSource.getRepository(News)
      const agencyRepository = AppDataSource.getRepository(Agency)

      const agencyFromDB = await agencyRepository.findOneBy({
        id: agency_id,
      })

      if (!agencyFromDB) {
        return {
          message: 'Ошибка, некорректное агентство',
        }
      }

      const { id } = agencyFromDB

      return await newsRepository
        .createQueryBuilder('news')
        .leftJoinAndSelect('news.user', 'user')
        .leftJoinAndSelect('news.agency', 'agency')
        .leftJoinAndSelect('news.images', 'images')
        .where('news.agency.id = :agencyId', { agencyId: id })
        .orderBy("news.created", "DESC")
        .getMany()
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Get('/list/:id')
  async getOne(@Param('id') id: number | string) {
    try {
      if (!isNaN(+id)) {
        return {
          message: 'Передано некорректное значение',
        }
      }

      const newsRepository = AppDataSource.getRepository(News)
      const newsItemFromDB = await newsRepository.findOneBy({
        id: +id,
      })

      if (!newsItemFromDB) {
        return {
          message: 'Запись не найдена',
        }
      }

      return newsItemFromDB
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Patch('/patch/:id')
  async edit(@Req() req: any, @Body() body: any, @Param('id') id: number | string) {
    try {
      if (!isNaN(+id)) {
        return {
          message: 'Передано некорректное значение',
        }
      }
      const { model } = body

      const newsRepository = AppDataSource.getRepository(News)
      const newsItemFromDB = await newsRepository.findOneBy({
        id: +id,
      })

      if (!newsItemFromDB) {
        return {
          message: 'Запись не найдена',
        }
      }

      const { text, tags, youtube } = model
      newsItemFromDB.text = text ?? newsItemFromDB.text
      newsItemFromDB.youtube = youtube ?? newsItemFromDB.youtube
      newsItemFromDB.tags = tags ?? newsItemFromDB.tags

      return await newsRepository.save(newsItemFromDB)
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Post('/delete/:id')
  async delete(@Res() res: any, @Param('id') id: number) {
    try {
      const newsRepository = AppDataSource.getRepository(News)
      const newsItemFromDB = await newsRepository.findOneBy({
        id: +id,
      })

      if (!newsItemFromDB) {
        return {
          message: 'Запись не найдена'
        }
      }

      await newsRepository.remove(newsItemFromDB)

      return res.status(200).send({ ok: true })
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }
}

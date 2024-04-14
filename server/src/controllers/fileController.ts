import { Delete, Get, JsonController, Param, QueryParam } from 'routing-controllers'
import XmlService from '../service/xmlService.js'
import { AppDataSource } from '../connectDataBase.js'
import { File } from '../entity/index.js'
import * as fs from 'node:fs'
import commonjsVariables from 'commonjs-variables-for-esmodules'
//   @ts-ignore
const {  __dirname } = commonjsVariables(import.meta)

@JsonController('/file')
export class FileController {
  @Get('/region-list/')
  async getRegionList() {
    try {
      return await new XmlService().getRegionList()
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Get('/city-list/')
  async getCityList(@QueryParam('regions', { isArray: true }) regions: string[]) {
    try {
      return await new XmlService().getCityList(regions)
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Get('/district-list/')
  async getDistrictList(
    @QueryParam('regions', { isArray: true }) regions: string[],
    @QueryParam('cities', { isArray: true }) cities: string[],
  ) {
    try {
      return await new XmlService().getDistrictList(regions, cities)
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Get('/read-xml/:hash')
  async readXMLFile(@Param('hash') hash: string) {
    try {
      return new XmlService().readXMlAndGetJSON(hash)
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  @Delete('/delete/:id')
  async deleteFile(@Param('id') id: any) {
    try {
      const fileRepository = AppDataSource.getRepository(File)
      const fileFromDB = await fileRepository.findOneBy({
        id: +id,
      })

      if (!fileFromDB) {
        return {
          message: 'Файл не найден',
        }
      }

      const linkFile = __dirname.split('controllers')[0]
      const fullLink = linkFile + fileFromDB.path
      fs.unlinkSync(fullLink)
      return await fileRepository.remove(fileFromDB)
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }
}

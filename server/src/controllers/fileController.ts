import { Get, JsonController, Param, Post, QueryParam, UseAfter } from "routing-controllers"
import XmlService from "../service/xmlService"

@JsonController("/file")
export class FileController {
  @Get("/region-list/")
  async getRegionList() {
    try {
      return await new XmlService().getRegionList();
    } catch (e) {
      return {
        message: "Ошибка сервера",
        error: e
      };
    }
  }

  @Get("/city-list/")
  async getCityList(@QueryParam("regions", { isArray: true }) regions: string[]) {
    try {
      return await new XmlService().getCityList(regions);
    } catch (e) {
      return {
        message: "Ошибка сервера",
        error: e
      };
    }
  }

  @Get("/district-list/")
  async getDistrictList(
    @QueryParam("regions", { isArray: true }) regions: string[],
    @QueryParam("cities", { isArray: true }) cities: string[]
  ) {
    try {
      return await new XmlService().getDistrictList(regions, cities);
    } catch (e) {
      return {
        message: "Ошибка сервера",
        error: e
      };
    }
  }

  @Get("/read-xml/:hash")
  async readXMLFile(@Param("hash") hash: string) {
    try {
      return new XmlService().readXMlAndGetJSON(hash);
    } catch (e) {
      return {
        message: "Ошибка сервера",
        error: e
      };
    }
  }
}

import { Controller, Get, Param } from "routing-controllers";
import { AppDataSource } from "../connectDataBase";
import { Agency, News } from "../entity";

@Controller("/news")
export class NewsController {
  @Get("/list")
  async getNewsList(@Param("agency_id") agency_id: number) {
    try {
      const newsRepository = AppDataSource.getRepository(News);
      const agencyRepository = AppDataSource.getRepository(Agency);

      const newsList = await newsRepository.find({
        agency: agency_id
      });

    } catch (e) {
      return {
        message: "Ошибка сервера",
        error: e
      };
    }
  }

  Get(

  "/list-item/:id";
)

  async getNewsItem() {
    try {
    } catch (e) {
      return {
        message: "Ошибка сервера",
        error: e
      };
    }
  }
}

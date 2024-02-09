import 'reflect-metadata'
import { Controller, Param, Body, Get, Post, Put, Delete, OnUndefined } from 'routing-controllers'
import { Agency } from "../entity/agency.js";
import { AppDataSource } from "../connectDataBase.js";

@Controller('/agency')
export class AgencyController {
  @Get('/:id')
  @OnUndefined(204)
  getOne(@Param('id') id: number) {
    try {
      const agencyRepository = AppDataSource.getRepository(Agency)
    } catch (e) {

    }
  }

  @Post('/')
  post(@Body() user: any) {
    return 'Saving user...'
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() user: any) {
    return 'Updating a user...'
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return 'Removing user...'
  }
}

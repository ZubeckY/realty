import 'reflect-metadata'
import { Param, Body, Get, Post, Put, Delete, OnUndefined, UseAfter, JsonController } from 'routing-controllers'
import { checkAuth } from '../middleware/checkAuth.js'
import { checkAgency } from '../middleware/checkAgency.js'
import { checkPaymentToken } from '../middleware/checkPaymentToken.js'

@UseAfter(checkAuth)
@UseAfter(checkAgency)
@UseAfter(checkPaymentToken)
@JsonController('/users')
export class UserController {
  @Get('/')
  getAll() {
    try {
    } catch (e) {}
  }

  @Get('/:id')
  @OnUndefined(204)
  getOne(@Param('id') id: number) {
    try {
    } catch (e) {}
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

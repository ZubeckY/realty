import { Body, Get, JsonController, Param, Post, UseAfter } from 'routing-controllers'
import { checkAuth } from '../middleware/checkAuth'
import { AppDataSource } from '../connectDataBase'
import { Deal } from '../entity'

@UseAfter(checkAuth)
@JsonController('/deal')
export class DealController {
  @Post('/list/:stage')
  async getListByStage(@Param('stage') stage: string, @Body() body: any) {
    const { agencyId } = body
    const dealRepository = AppDataSource.getRepository(Deal)
    return await dealRepository
      .createQueryBuilder('deal')
      .leftJoinAndSelect('deal.realty', 'realty')
      .leftJoinAndSelect('deal.agency', 'agency')
      .leftJoinAndSelect('deal.lead', 'lead')
      .leftJoinAndSelect('deal.lead.user', 'lead.user')
      .leftJoinAndSelect('deal.lead.manager', 'lead.manager')
      .leftJoinAndSelect('deal.lead.client', 'lead.client')
      .where('deal.agency.id = :agencyId', { agencyId: agencyId, stage: stage })
      .getMany()
  }
}
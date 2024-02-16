import { Agency } from '../entity/index.js'

export default class AgencyDto {
  id
  inn
  title
  created

  constructor(model: Agency) {
    this.id = model.id
    this.inn = model.inn
    this.title = model.title
    this.created = model.created
  }
}

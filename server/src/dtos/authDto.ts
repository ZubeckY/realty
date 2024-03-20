import { User } from '../entity/index.js'

export default class AuthDto {
  id
  email

  constructor(model: User) {
    this.id = model.id
    this.email = model.email
  }
}

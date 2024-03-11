import { User } from '../entity/index.js'

export default class AuthDto {
  id
  email
  firstName

  constructor(model: User) {
    this.id = model.id
    this.email = model.email
    this.firstName = model.firstName
  }
}

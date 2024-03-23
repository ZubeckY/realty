export default class AuthDto {
  // user
  id
  email

  // userAgent
  ip
  device
  userAgent

  constructor(model: any) {
    this.id = model.id
    this.email = model.email

    this.ip = model.ip
    this.device = model.device
    this.userAgent = model.userAgent
  }
}

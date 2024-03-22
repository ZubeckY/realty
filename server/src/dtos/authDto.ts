export default class AuthDto {
  id
  ip
  email
  device

  constructor(model: any) {
    this.id = model.id
    this.ip = model.ip
    this.device = model.device
    this.email = model.email
  }
}

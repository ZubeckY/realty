import * as useragent from 'useragent'

export default class SecurityService {
  async checkCurrentUser(req: any) {
    try {
      const devices = await this.checkDeviceUser(req)
    } catch (e) {}
  }

  async newLogin(req: any) {
    try {
      const devices: any = await this.checkDeviceUser(req)
      return `Вход с нового устройства. \n ${devices} \n Если это были не вы, смените пароль!`
    } catch (e) {}
  }

  async changeRoleUser() {}

  async checkDeviceUser(req: any) {
    try {
      const ip = req.ip
      console.log(ip);

      const agent = useragent.parse(req.headers['user-agent'])
      return agent.toString()
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }
}

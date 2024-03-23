import * as useragent from 'useragent'

export default class SecurityService {
  async newLogin(req: any) {
    try {
      const devices: any = await this.checkDeviceUser(req)
      return `Вход с нового устройства. \n
       ip: ${devices.ip}, \n
       Устройство: ${devices.device}, \n
       UserAgent: ${devices.userAgent}, \n
       Если это были не вы, смените пароль!`
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  async checkDeviceUser(req: any) {
    try {
      let ip = req.ip
      const agent = useragent.parse(req.headers['user-agent'])

      if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7)
      }

      return {
        ip: ip,
        device: agent.device.toString(),
        userAgent: agent.toString(),
      }
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }
}

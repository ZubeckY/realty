import { createRequire } from 'module'
//@ts-ignore
const require: any = createRequire(import.meta.url)
const device = require('device-ip-location')

export default class SecurityService {
  async checkCurrentUser(req: any) {
    try {
      const devices = await this.checkDeviceUser(req)

    } catch (e) {}
  }

  async newLogin(req: any) {
    try {
      const devices: any = await this.checkDeviceUser(req)
      return `Вход с нового устройства. \n ${devices.os} \n ${devices.browser}. \n Если это были не вы, смените пароль!`
    } catch (e) {
    }
  }

  async changeRoleUser() {}

  async checkDeviceUser(req: any) {
    try {
      const agent = req.headers['user-agent']
      const requestIp = req.ip

      //
      device.getInfo(agent, requestIp, function (err: any, res: any) {
        if (err) {
          return {
            message: 'Ошибка',
            error: err
          }
        }

        const OS = 'OS: ' + res['device']['os']['name'] + ' ' + res['device']['os']['version']
        const BROWSER = 'Браузер: ' + res['device']['client']['name'] + ' ' + res['device']['client']['version']

        return {
          os: OS,
          browser: BROWSER
        }
      })
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e
      }
    }
  }
}

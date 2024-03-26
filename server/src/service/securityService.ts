import * as useragent from 'useragent'

export default class SecurityService {
  async newLogin(req: any) {
    try {
      const devices: any = await this.checkDeviceUser(req)

      return `
        <div>
          <h6>Вход с нового устройства.</h6>
          <br />
          <ul>
            <li>ip: ${devices.ip},</li>
            <li>Устройство: ${devices.device},</li>
            <li>UserAgent: ${devices.userAgent},</li>
          </ul>
          <br />
          <p>Если это были не вы, смените пароль!</p>
        </div>
      `
    } catch (e) {
      return {
        message: 'Ошибка сервера',
        error: e,
      }
    }
  }

  async passwordChanged(req: any, data: Record<string, string>) {
    try {
      const devices: any = await this.checkDeviceUser(req)
      const { email, password } = data

      return `
        <div>
          <h6>Ваш пароль был изменён.</h6>  
          <br />
          <p>Ваш enail: ${email}</p>
          <p>Новый пароль: ${password}</p>
          <br />
          <p>Действие произведено с устройства:</p>
          <ul>
            <li>ip: ${devices.ip},</li>
            <li>Устройство: ${devices.device},</li>
            <li>UserAgent: ${devices.userAgent},</li>
          </ul>
          <br />
          <p>Если это были не вы, Напишите нам в поддержку!</p>
        </div>
      `
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

      if (ip.substr(0, 7) == '::ffff:') {
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

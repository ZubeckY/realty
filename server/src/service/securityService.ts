import * as useragent from 'useragent'
import { createRequire } from 'module'
//@ts-ignore
const require: any = createRequire(import.meta.url)
const device = require('device-ip-location')

export default class SecurityService {
  async checkCurrentUser(req: any) {
    try {
      // const agent = useragent.parse(req.headers['user-agent'])
      // const browserAndOS = agent.toString()
      //
      // console.log('browserAndOS ', browserAndOS)

      const agent = req.headers['user-agent']
      const requestIp = req.ip

      //
      device.getInfo(agent, requestIp, function (err: any, res: any) {
        if (err) {
          console.log(err)
          return
        }

        console.log(Object.keys(res));
        console.log(res['locale']);
        const OS = 'OS: ' + res['device']['os']['name'] + ' ' + res['device']['os']['version']
        const BROWSER = 'Браузер: ' + res['device']['client']['name'] + ' ' + res['device']['client']['version']

        console.log(OS);
        console.log(BROWSER);

      })
    } catch (e) {}
  }

  async newLogin(req: any) {}

  async changeRoleUser() {}
}

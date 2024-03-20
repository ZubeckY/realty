import config from '../config.js'
import * as nodemailer from 'nodemailer'

export default class MailService {
  transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: false,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  async sendActivationMail(to: string, link: string) {
    try {
      await this.transporter.sendMail({
        from: config.SMTP_USER,
        to,
        subject: 'Активация аккаунта на ' + config.API_URL,
        text: '',
        html: `
        <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
        </div>
    `,
      })
    } catch (e) {
      console.log(e);
    }
  }

  async sendActivationCode(to: string, code: string) {
    try {
      await this.transporter.sendMail({
        from: config.SMTP_USER,
        to,
        subject: 'Активация аккаунта на ' + config.API_URL,
        text: '',
        html: `
        <div>
            <h1>Ваш код активации: ${code}</h1>
            <p>Если действие выполняете не вы, проигнорируйте это письмо</p>
        </div>
    `,
      })
    } catch (e) {
      console.log(e);
    }
  }

  async sendSecurityMessage(to: string, text: string){
    try {
      await this.transporter.sendMail({
        from: config.SMTP_USER,
        to,
        subject: 'Система оповещения и безопасности на ' + config.API_URL,
        text: '',
        html: text,
      })
    } catch (e) {
      console.log(e);
    }
  }
}

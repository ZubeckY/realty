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
        subject: 'Активация аккаунта на CRealtyM',
        text: '',
        html: `
        <div>
          <h1>Для активации перейдите по ссылке</h1>
          <br />
          <a href="${link}">${link}</a>
        </div>
    `,
      })
    } catch (e) {
      console.log(e);
    }
  }

  async sendWelcomeMail(model: any) {

  }

  async sendActivationCode(to: string, code: string) {
    try {
      const message = `
        <div>
          <h1>Ваш код активации: ${code}</h1>
          <br />
          <p>Если действие выполняете не вы, проигнорируйте это письмо</p>
        </div>
      `

      await this.transporter.sendMail({
        from: config.SMTP_USER,
        to,
        subject: 'Активация аккаунта на CRealtyM',
        text: '',
        html: message,
      })
    } catch (e) {
      console.log(e);
    }
  }

  async sendSecurityMessage(to: string, html: string){
    try {
      await this.transporter.sendMail({
        from: config.SMTP_USER,
        to,
        subject: 'Система безопасности CRealtyM',
        text: '',
        html,
      })
    } catch (e) {
      console.log(e);
    }
  }

  async sendMessageChangePassword(to: string, confirmURL: string) {
    try {
      const message = `
        <div>
          <h1>Изменение пароля</h1>
          <br />
          <p>Ваш email был указан при запросе смены пароля. </p>
          <p>Для продолжения перейдите по ссылке <a href="${confirmURL}">${confirmURL}</a></p>
        </div>
      `

      await this.transporter.sendMail({
        from: config.SMTP_USER,
        to,
        subject: 'Система безопасности CRealtyM',
        text: '',
        html: message,
      })
    } catch (e) {
      console.log(e);
    }
  }


  /* agency invite */
  async sendUserMailInviteCreated(to: string, agency: string) {
    try {
      const message = `
        <div>
          <h1>Создан запрос на приглашение в агентство.</h1>
          <br />
          <p>Вами недавно был создан запрос на вступление в агентство ${agency}</p>
          <p>Отслеживать запрос вы можете в Вашем личном кабинете</p>
        </div>      
      `

      await this.transporter.sendMail({
        from: config.SMTP_USER,
        to,
        subject: 'Система оповещения CRealtyM',
        text: '',
        html: message,
      })
    } catch (e) {
      console.log(e);
    }
  }

  async sendUserMailInviteAccepted(to: string, agency: string) {
    try {
      const message = `
        <div>
          <h1>Запрос на приглашение был принят агентством ${agency}.</h1>
          <br />
          <p>Агентство ${agency} рассмотрело Ваш запрос и приняла Вас.</p>
          <p>Теперь вы состоите в агентстве</p>
        </div>      
      `

      await this.transporter.sendMail({
        from: config.SMTP_USER,
        to,
        subject: 'Система оповещения CRealtyM',
        text: '',
        html: message,
      })
    } catch (e) {
      console.log(e);
    }
  }

  async sendUserMailInviteRejected(to: string, html: string) {
    try {
      await this.transporter.sendMail({
        from: config.SMTP_USER,
        to,
        subject: 'Система оповещения CRealtyM',
        text: '',
        html,
      })
    } catch (e) {
      console.log(e);
    }
  }
}

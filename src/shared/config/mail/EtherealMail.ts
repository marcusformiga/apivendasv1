import nodemailer from "nodemailer"
import { HandleBarsMailParse } from "./HandleBarsMailParse"

interface ISendMail {
  to: IMAilContact
  from?: IMAilContact
  subject: string
  templateData: IMailTemplateParse
}
interface ITemplateVariables {
  [key: string]: string | number
}
interface IMailTemplateParse {
  template: string
  variables: ITemplateVariables
}
interface IMAilContact {
  name: string
  email: string
}

export class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount()
    const mailTemplate = new HandleBarsMailParse()
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    })
    const message = await transporter.sendMail({
      from: {
        name: from?.name || "Equipe api vendas",
        address: from?.email || "Equipe@vendas.com.br",
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    })
    console.log("Message sent: %s", message.messageId)
    console.log(
      "Message preview url: %s",
      nodemailer.getTestMessageUrl(message),
    )
  }
}

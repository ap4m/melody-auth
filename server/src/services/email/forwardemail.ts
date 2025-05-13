import { env } from 'hono/adapter'
import {
  IMailer, SendEmailOptions,
} from './interface'

/**
* @docs https://forwardemail.net/en/email-api#outbound-emails
*/
export class ForwardemailMailer extends IMailer {
  async sendEmail ({
    email, subject, content, senderName,
  }: SendEmailOptions) {
    const {
      FORWARDEMAIL_API_KEY: apiKey, FORWARDEMAIL_SENDER_ADDRESS: senderEmail,
    } = env(this.context)
    
    const form = new FormData()
    form.append(
      'from',
      `${senderName} <${senderEmail}>`,
    )
    form.append(
      'to',
      email,
    )
    form.append(
      'subject',
      subject,
    )
    form.append(
      'html',
      content,
    )

    const auth = Buffer.from(`${apiKey}:`).toString('base64')

    const res = await fetch(
      'https://api.forwardemail.net/v1/emails',
      {
        method: 'POST',
        headers: { Authorization: `Basic ${auth}` },
        body: form,
      }
    )

    return res
  }
}

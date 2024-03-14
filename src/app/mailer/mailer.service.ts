import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { SendMailModel } from './models/send-email.model';
import * as ejs from 'ejs';
import { join } from 'path';

@Injectable()
export class MailerService {
  /**
   * base function to send mail through nodemailer client
   * @param sendMailModel the mail content
   */
  public async sendMail(sendMailModel: SendMailModel) {
    // create mailer transport by using credentials
    const mailerClient: nodemailer.Transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });

    // send email
    return mailerClient.sendMail({
      from: process.env.MAILER_FROM_EMAIL,
      to: sendMailModel.to,
      subject: sendMailModel.subject,
      html: await this.getHtml(sendMailModel.template, sendMailModel.context),
    });
  }

  getHtml = (template: string, context: object) => {
    return ejs.renderFile(
      join(__dirname, '../../templates', template),
      context,
    );
  };
}

import { Inject, Injectable } from '@nestjs/common';
import * as NodeMailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { config } from 'src/helpers';

import { MAILER_OPTIONS } from './constants';
import type { IOptions } from './interfaces';

@Injectable()
export class MailerService {
  private transporter: NodeMailer.Transporter<SMTPTransport.SentMessageInfo>;
  private fromName: string;
  private fromAddress: string;

  constructor(@Inject(MAILER_OPTIONS) options: IOptions) {
    this.transporter = NodeMailer.createTransport(options);
    this.fromName = config('mailer.MAIL_FROM_NAME');
    this.fromAddress = config('mailer.MAIL_FROM_ADDRESS');
  }

  async sendMail(): Promise<SMTPTransport.SentMessageInfo> {
    return await this.transporter.sendMail({
      from: `"${this.fromName}" ${this.fromAddress}`,
      to: 'julfanshahidayah@gmail.com',
      subject: 'Test NestJS Mailer',
      text: 'Hello world!',
      html: '<b>Hello world!</b>',
    });
  }
}

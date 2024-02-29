import { Inject, Injectable } from '@nestjs/common';
import * as NodeMailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { config } from 'src/helpers';

import { MAILER_OPTIONS } from './constants';
import type { ITransportOptions, IMailOptions } from './interfaces';

@Injectable()
export class MailerService {
  private transporter: NodeMailer.Transporter<SMTPTransport.SentMessageInfo>;
  private fromName: string;
  private fromAddress: string;

  constructor(@Inject(MAILER_OPTIONS) options: ITransportOptions) {
    this.transporter = NodeMailer.createTransport(options);
    this.fromName = config('mailer.MAIL_FROM_NAME');
    this.fromAddress = config('mailer.MAIL_FROM_ADDRESS');
  }

  async sendMail(
    options: IMailOptions,
  ): Promise<SMTPTransport.SentMessageInfo> {
    if (!options.from) {
      options['from'] = `"${this.fromName}" ${this.fromAddress}`;
    }

    return await this.transporter.sendMail(options);
  }
}

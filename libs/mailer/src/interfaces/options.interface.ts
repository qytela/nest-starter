import type Mail from 'nodemailer/lib/mailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

export interface ITransportOptions extends SMTPTransport.Options {}

export interface IMailOptions extends Mail.Options {}

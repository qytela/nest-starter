import type SMTPTransport from 'nodemailer/lib/smtp-transport';

export interface IOptions extends SMTPTransport.Options {}

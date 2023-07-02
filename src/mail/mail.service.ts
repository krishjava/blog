import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(to: string, from: string): Promise<any> {
    if (!to && !from) {
      return {
        message: 'provide to, from email',
      };
    }
    const emailResponse = await this.mailerService.sendMail({
      to: to.trim(),
      from: from.trim(), // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      text: 'welcome!',
      template: '<b>This is template message</b>',
    });
    return emailResponse.response.includes('OK');
  }
}

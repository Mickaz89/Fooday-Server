import { Body, Controller, Post, Query } from '@nestjs/common';
import { SendgridService } from 'src/sendgrid/sendgrid.service';

@Controller('mail')
export class MailController {
  constructor(private readonly sendgridService: SendgridService) {}

  // Here we use query parameter to get the email that we want to send
  @Post('send-email')
  async sendEmail(@Query('email') email) {
    console.log('email ', email);
    const mail = {
      to: email,
      subject: 'Hello from sendgrid',
      from: 'trackfood.isr@gmail.com', // Fill it with your validated email on SendGrid account
      text: 'Hello',
      html: '<h1>Hello</h1>',
    };

    try {
      const res = await this.sendgridService.send(mail);
      return res;
    } catch (err) {
      return err;
    }
  }
  @Post('event')
  async getEvent(@Body('') body) {
    console.log('body ', body);
    return body;
  }
}

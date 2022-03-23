import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

const whitelist = [
  'http://localhost:3001',
  'http://localhost:3000',
  'localhost' /** other domains if any */,
  'https://61e99e821eda4a5b05fe74d2--traqfood.netlify.app/',
  'https://traqfood.netlify.app',
  'http://localhost:19006',
  'http://10.100.102.3:19006',
  'http://127.0.0.1:19000',
  'exp://10.100.102.3:19000',
  'foody-mobile',
];

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    console.log('origin', origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = process.env.PORT || 3000;
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();

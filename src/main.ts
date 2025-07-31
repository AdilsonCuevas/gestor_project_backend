import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'https://gestor-project-frontend-2ifu.vercel.app',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 4000);
}


bootstrap();

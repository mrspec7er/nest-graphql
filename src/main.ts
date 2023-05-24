import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dbConnect from 'utility/dbConnection';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dbConnect();
  await app.listen(3000);
}
bootstrap();

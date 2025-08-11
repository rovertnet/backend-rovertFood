import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Active la validation des DTOs partout
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*', // Adjust this to your needs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  rootPath: join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  }
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

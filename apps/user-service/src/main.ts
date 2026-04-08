import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserServiceModule } from './user-service.module';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('User Service API')
    .setDescription('CRUD de localidades para PuntoCell')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, swaggerDocument);

  await app.listen(process.env.port ?? 3000);
}
bootstrap();

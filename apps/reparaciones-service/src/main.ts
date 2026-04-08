import { NestFactory } from '@nestjs/core';
import { ReparacionesServiceModule } from './reparaciones-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ReparacionesServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

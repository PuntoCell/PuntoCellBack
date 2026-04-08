import { NestFactory } from '@nestjs/core';
import { NotificacionesServiceModule } from './notificaciones-service.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificacionesServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

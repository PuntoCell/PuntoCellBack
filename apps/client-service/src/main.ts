import { NestFactory } from '@nestjs/core';
import { ClientServiceModule } from './client-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ClientServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

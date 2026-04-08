import { NestFactory } from '@nestjs/core';
import { DispositivosServiceModule } from './dispositivos-service.module';

async function bootstrap() {
  const app = await NestFactory.create(DispositivosServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

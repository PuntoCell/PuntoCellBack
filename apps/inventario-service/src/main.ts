import { NestFactory } from '@nestjs/core';
import { InventarioServiceModule } from './inventario-service.module';

async function bootstrap() {
  const app = await NestFactory.create(InventarioServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

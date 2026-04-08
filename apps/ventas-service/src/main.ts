import { NestFactory } from '@nestjs/core';
import { VentasServiceModule } from './ventas-service.module';

async function bootstrap() {
  const app = await NestFactory.create(VentasServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { SucursalesServiceModule } from './sucursales-service.module';

async function bootstrap() {
  const app = await NestFactory.create(SucursalesServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

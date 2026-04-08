import { NestFactory } from '@nestjs/core';
import { CatalogoServiceModule } from './catalogo-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CatalogoServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

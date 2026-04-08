import { NestFactory } from '@nestjs/core';
import { ReportesServiceModule } from './reportes-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ReportesServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

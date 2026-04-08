import { NestFactory } from '@nestjs/core';
import { PersonalServiceModule } from './personal-service.module';

async function bootstrap() {
  const app = await NestFactory.create(PersonalServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserServiceController } from './user-service.controller';
import { LocalidadRepository } from './lib/localidad.repository';
import { MongoDatabaseModule } from './lib/mongo-database.module';
import { PrismaService } from './lib/prisma.service';
import { UserServiceService } from './user-service.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongoDatabaseModule,
  ],
  controllers: [UserServiceController],
  providers: [UserServiceService, LocalidadRepository, PrismaService],
})
export class UserServiceModule {}

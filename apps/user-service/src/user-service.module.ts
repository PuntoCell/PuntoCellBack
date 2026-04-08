import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserServiceController } from './controllers/user-service.controller';
import { LocalidadRepository } from './daos/localidad.repository';
import { MongoDatabaseModule } from './lib/mongo-database.module';
import { PrismaService } from './lib/prisma.service';
import { UserServiceService } from './services/user-service.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongoDatabaseModule,
  ],
  controllers: [UserServiceController],
  providers: [UserServiceService, LocalidadRepository, PrismaService],
})
export class UserServiceModule {}

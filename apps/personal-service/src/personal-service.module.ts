import { Module } from '@nestjs/common';
import { PersonalServiceController } from './controllers/personal-service.controller';
import { PersonalServiceService } from './services/personal-service.service';
import { RolRepository } from './daos/rol.repository';
import { PermisoRepository } from './daos/permiso.repository';
import { RolPermisoRepository } from './daos/rol-permiso.repository';
import { PrismaService } from './lib/prisma.service';

@Module({
  imports: [],
  controllers: [PersonalServiceController],
  providers: [
    PersonalServiceService,
    RolRepository,
    PermisoRepository,
    RolPermisoRepository,
    PrismaService,
  ],
})
export class PersonalServiceModule {}

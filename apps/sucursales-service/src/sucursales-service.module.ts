import { Module } from '@nestjs/common';
import { SucursalesServiceController } from './sucursales-service.controller';
import { SucursalesServiceService } from './sucursales-service.service';

@Module({
  imports: [],
  controllers: [SucursalesServiceController],
  providers: [SucursalesServiceService],
})
export class SucursalesServiceModule {}

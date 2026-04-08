import { Module } from '@nestjs/common';
import { ReparacionesServiceController } from './reparaciones-service.controller';
import { ReparacionesServiceService } from './reparaciones-service.service';

@Module({
  imports: [],
  controllers: [ReparacionesServiceController],
  providers: [ReparacionesServiceService],
})
export class ReparacionesServiceModule {}

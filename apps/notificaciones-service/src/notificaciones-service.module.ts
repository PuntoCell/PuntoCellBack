import { Module } from '@nestjs/common';
import { NotificacionesServiceController } from './notificaciones-service.controller';
import { NotificacionesServiceService } from './notificaciones-service.service';

@Module({
  imports: [],
  controllers: [NotificacionesServiceController],
  providers: [NotificacionesServiceService],
})
export class NotificacionesServiceModule {}

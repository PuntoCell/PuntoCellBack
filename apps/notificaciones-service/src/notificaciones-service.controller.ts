import { Controller, Get } from '@nestjs/common';
import { NotificacionesServiceService } from './notificaciones-service.service';

@Controller()
export class NotificacionesServiceController {
  constructor(private readonly notificacionesServiceService: NotificacionesServiceService) {}

  @Get()
  getHello(): string {
    return this.notificacionesServiceService.getHello();
  }
}

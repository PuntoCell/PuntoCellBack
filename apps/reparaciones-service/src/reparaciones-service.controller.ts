import { Controller, Get } from '@nestjs/common';
import { ReparacionesServiceService } from './reparaciones-service.service';

@Controller()
export class ReparacionesServiceController {
  constructor(private readonly reparacionesServiceService: ReparacionesServiceService) {}

  @Get()
  getHello(): string {
    return this.reparacionesServiceService.getHello();
  }
}

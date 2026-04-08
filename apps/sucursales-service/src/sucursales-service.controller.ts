import { Controller, Get } from '@nestjs/common';
import { SucursalesServiceService } from './sucursales-service.service';

@Controller()
export class SucursalesServiceController {
  constructor(private readonly sucursalesServiceService: SucursalesServiceService) {}

  @Get()
  getHello(): string {
    return this.sucursalesServiceService.getHello();
  }
}

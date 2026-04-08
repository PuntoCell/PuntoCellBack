import { Controller, Get } from '@nestjs/common';
import { VentasServiceService } from './ventas-service.service';

@Controller()
export class VentasServiceController {
  constructor(private readonly ventasServiceService: VentasServiceService) {}

  @Get()
  getHello(): string {
    return this.ventasServiceService.getHello();
  }
}

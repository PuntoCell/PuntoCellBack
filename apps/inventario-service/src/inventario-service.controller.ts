import { Controller, Get } from '@nestjs/common';
import { InventarioServiceService } from './inventario-service.service';

@Controller()
export class InventarioServiceController {
  constructor(private readonly inventarioServiceService: InventarioServiceService) {}

  @Get()
  getHello(): string {
    return this.inventarioServiceService.getHello();
  }
}

import { Controller, Get } from '@nestjs/common';
import { CatalogoServiceService } from './catalogo-service.service';

@Controller()
export class CatalogoServiceController {
  constructor(private readonly catalogoServiceService: CatalogoServiceService) {}

  @Get()
  getHello(): string {
    return this.catalogoServiceService.getHello();
  }
}

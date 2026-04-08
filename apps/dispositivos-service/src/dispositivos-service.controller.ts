import { Controller, Get } from '@nestjs/common';
import { DispositivosServiceService } from './dispositivos-service.service';

@Controller()
export class DispositivosServiceController {
  constructor(private readonly dispositivosServiceService: DispositivosServiceService) {}

  @Get()
  getHello(): string {
    return this.dispositivosServiceService.getHello();
  }
}

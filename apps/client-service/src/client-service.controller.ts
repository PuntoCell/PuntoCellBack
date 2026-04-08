import { Controller, Get } from '@nestjs/common';
import { ClientServiceService } from './client-service.service';

@Controller()
export class ClientServiceController {
  constructor(private readonly clientServiceService: ClientServiceService) {}

  @Get()
  getHello(): string {
    return this.clientServiceService.getHello();
  }
}

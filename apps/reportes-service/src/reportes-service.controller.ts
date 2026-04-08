import { Controller, Get } from '@nestjs/common';
import { ReportesServiceService } from './reportes-service.service';

@Controller()
export class ReportesServiceController {
  constructor(private readonly reportesServiceService: ReportesServiceService) {}

  @Get()
  getHello(): string {
    return this.reportesServiceService.getHello();
  }
}

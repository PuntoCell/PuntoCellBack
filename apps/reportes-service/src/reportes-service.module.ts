import { Module } from '@nestjs/common';
import { ReportesServiceController } from './reportes-service.controller';
import { ReportesServiceService } from './reportes-service.service';

@Module({
  imports: [],
  controllers: [ReportesServiceController],
  providers: [ReportesServiceService],
})
export class ReportesServiceModule {}

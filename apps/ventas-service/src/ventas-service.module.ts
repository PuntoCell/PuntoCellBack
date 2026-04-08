import { Module } from '@nestjs/common';
import { VentasServiceController } from './ventas-service.controller';
import { VentasServiceService } from './ventas-service.service';

@Module({
  imports: [],
  controllers: [VentasServiceController],
  providers: [VentasServiceService],
})
export class VentasServiceModule {}

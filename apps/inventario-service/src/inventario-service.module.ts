import { Module } from '@nestjs/common';
import { InventarioServiceController } from './inventario-service.controller';
import { InventarioServiceService } from './inventario-service.service';

@Module({
  imports: [],
  controllers: [InventarioServiceController],
  providers: [InventarioServiceService],
})
export class InventarioServiceModule {}

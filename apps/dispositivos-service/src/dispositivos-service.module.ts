import { Module } from '@nestjs/common';
import { DispositivosServiceController } from './dispositivos-service.controller';
import { DispositivosServiceService } from './dispositivos-service.service';

@Module({
  imports: [],
  controllers: [DispositivosServiceController],
  providers: [DispositivosServiceService],
})
export class DispositivosServiceModule {}

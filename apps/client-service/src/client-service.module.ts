import { Module } from '@nestjs/common';
import { ClientServiceController } from './client-service.controller';
import { ClientServiceService } from './client-service.service';

@Module({
  imports: [],
  controllers: [ClientServiceController],
  providers: [ClientServiceService],
})
export class ClientServiceModule {}

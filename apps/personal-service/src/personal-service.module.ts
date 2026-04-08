import { Module } from '@nestjs/common';
import { PersonalServiceController } from './personal-service.controller';
import { PersonalServiceService } from './personal-service.service';

@Module({
  imports: [],
  controllers: [PersonalServiceController],
  providers: [PersonalServiceService],
})
export class PersonalServiceModule {}

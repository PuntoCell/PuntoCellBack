import { Controller, Get } from '@nestjs/common';
import { PersonalServiceService } from './personal-service.service';

@Controller()
export class PersonalServiceController {
  constructor(private readonly personalServiceService: PersonalServiceService) {}

  @Get()
  getHello(): string {
    return this.personalServiceService.getHello();
  }
}

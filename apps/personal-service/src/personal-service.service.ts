import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonalServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}

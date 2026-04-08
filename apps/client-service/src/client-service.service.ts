import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}

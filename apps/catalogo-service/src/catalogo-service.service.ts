import { Injectable } from '@nestjs/common';

@Injectable()
export class CatalogoServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}

import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @All('*')
  async proxyAll(@Req() req: Request, @Res() res: Response) {
    await this.apiGatewayService.proxy(req, res);
  }
}

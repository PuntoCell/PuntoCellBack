import { Test, TestingModule } from '@nestjs/testing';
import { SucursalesServiceController } from './sucursales-service.controller';
import { SucursalesServiceService } from './sucursales-service.service';

describe('SucursalesServiceController', () => {
  let sucursalesServiceController: SucursalesServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SucursalesServiceController],
      providers: [SucursalesServiceService],
    }).compile();

    sucursalesServiceController = app.get<SucursalesServiceController>(SucursalesServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sucursalesServiceController.getHello()).toBe('Hello World!');
    });
  });
});

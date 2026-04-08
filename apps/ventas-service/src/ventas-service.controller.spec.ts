import { Test, TestingModule } from '@nestjs/testing';
import { VentasServiceController } from './ventas-service.controller';
import { VentasServiceService } from './ventas-service.service';

describe('VentasServiceController', () => {
  let ventasServiceController: VentasServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VentasServiceController],
      providers: [VentasServiceService],
    }).compile();

    ventasServiceController = app.get<VentasServiceController>(VentasServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ventasServiceController.getHello()).toBe('Hello World!');
    });
  });
});

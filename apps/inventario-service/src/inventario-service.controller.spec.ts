import { Test, TestingModule } from '@nestjs/testing';
import { InventarioServiceController } from './inventario-service.controller';
import { InventarioServiceService } from './inventario-service.service';

describe('InventarioServiceController', () => {
  let inventarioServiceController: InventarioServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InventarioServiceController],
      providers: [InventarioServiceService],
    }).compile();

    inventarioServiceController = app.get<InventarioServiceController>(InventarioServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(inventarioServiceController.getHello()).toBe('Hello World!');
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ReparacionesServiceController } from './reparaciones-service.controller';
import { ReparacionesServiceService } from './reparaciones-service.service';

describe('ReparacionesServiceController', () => {
  let reparacionesServiceController: ReparacionesServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReparacionesServiceController],
      providers: [ReparacionesServiceService],
    }).compile();

    reparacionesServiceController = app.get<ReparacionesServiceController>(ReparacionesServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(reparacionesServiceController.getHello()).toBe('Hello World!');
    });
  });
});

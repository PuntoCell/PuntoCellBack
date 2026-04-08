import { Test, TestingModule } from '@nestjs/testing';
import { DispositivosServiceController } from './dispositivos-service.controller';
import { DispositivosServiceService } from './dispositivos-service.service';

describe('DispositivosServiceController', () => {
  let dispositivosServiceController: DispositivosServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DispositivosServiceController],
      providers: [DispositivosServiceService],
    }).compile();

    dispositivosServiceController = app.get<DispositivosServiceController>(DispositivosServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(dispositivosServiceController.getHello()).toBe('Hello World!');
    });
  });
});

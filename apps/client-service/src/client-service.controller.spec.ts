import { Test, TestingModule } from '@nestjs/testing';
import { ClientServiceController } from './client-service.controller';
import { ClientServiceService } from './client-service.service';

describe('ClientServiceController', () => {
  let clientServiceController: ClientServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClientServiceController],
      providers: [ClientServiceService],
    }).compile();

    clientServiceController = app.get<ClientServiceController>(ClientServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(clientServiceController.getHello()).toBe('Hello World!');
    });
  });
});

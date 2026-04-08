import { Test, TestingModule } from '@nestjs/testing';
import { NotificacionesServiceController } from './notificaciones-service.controller';
import { NotificacionesServiceService } from './notificaciones-service.service';

describe('NotificacionesServiceController', () => {
  let notificacionesServiceController: NotificacionesServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificacionesServiceController],
      providers: [NotificacionesServiceService],
    }).compile();

    notificacionesServiceController = app.get<NotificacionesServiceController>(NotificacionesServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(notificacionesServiceController.getHello()).toBe('Hello World!');
    });
  });
});

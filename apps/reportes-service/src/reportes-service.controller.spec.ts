import { Test, TestingModule } from '@nestjs/testing';
import { ReportesServiceController } from './reportes-service.controller';
import { ReportesServiceService } from './reportes-service.service';

describe('ReportesServiceController', () => {
  let reportesServiceController: ReportesServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReportesServiceController],
      providers: [ReportesServiceService],
    }).compile();

    reportesServiceController = app.get<ReportesServiceController>(ReportesServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(reportesServiceController.getHello()).toBe('Hello World!');
    });
  });
});

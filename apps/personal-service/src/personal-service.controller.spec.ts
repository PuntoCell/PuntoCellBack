import { Test, TestingModule } from '@nestjs/testing';
import { PersonalServiceController } from './personal-service.controller';
import { PersonalServiceService } from './personal-service.service';

describe('PersonalServiceController', () => {
  let personalServiceController: PersonalServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PersonalServiceController],
      providers: [PersonalServiceService],
    }).compile();

    personalServiceController = app.get<PersonalServiceController>(PersonalServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(personalServiceController.getHello()).toBe('Hello World!');
    });
  });
});

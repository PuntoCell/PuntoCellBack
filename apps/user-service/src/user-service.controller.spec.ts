import { Test, TestingModule } from '@nestjs/testing';
import { UserServiceController } from './controllers/user-service.controller';
import { UserServiceService } from './services/user-service.service';

describe('UserServiceController', () => {
  let userServiceController: UserServiceController;
  const localidades = [
    { id: 1, nombre: 'Capital Federal' },
    { id: 2, nombre: 'Rosario' },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserServiceController],
      providers: [
        {
          provide: UserServiceService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(localidades),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    userServiceController = app.get<UserServiceController>(UserServiceController);
  });

  describe('localidades', () => {
    it('should return localidades from service', async () => {
      await expect(userServiceController.findAll()).resolves.toEqual(localidades);
    });
  });
});

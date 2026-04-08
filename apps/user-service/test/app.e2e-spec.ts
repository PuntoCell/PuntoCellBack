import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserServiceModule } from './../src/user-service.module';
import { LocalidadRepository } from './../src/daos/localidad.repository';

describe('UserServiceController (e2e)', () => {
  let app: INestApplication;
  const localidades = [
    { id: 1, nombre: 'Capital Federal' },
    { id: 2, nombre: 'Rosario' },
  ];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserServiceModule],
    })
      .overrideProvider(LocalidadRepository)
      .useValue({
        findAll: jest.fn().mockResolvedValue(localidades),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/localidades (GET)', () => {
    return request(app.getHttpServer())
      .get('/localidades')
      .expect(200)
      .expect([
        { id: 1, nombre: 'Capital Federal' },
        { id: 2, nombre: 'Rosario' },
      ]);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoServiceController } from './catalogo-service.controller';
import { CatalogoServiceService } from './catalogo-service.service';

describe('CatalogoServiceController', () => {
  let catalogoServiceController: CatalogoServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatalogoServiceController],
      providers: [CatalogoServiceService],
    }).compile();

    catalogoServiceController = app.get<CatalogoServiceController>(CatalogoServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(catalogoServiceController.getHello()).toBe('Hello World!');
    });
  });
});

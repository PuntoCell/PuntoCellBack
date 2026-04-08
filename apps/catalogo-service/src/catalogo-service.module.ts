import { Module } from '@nestjs/common';
import { CatalogoServiceController } from './catalogo-service.controller';
import { CatalogoServiceService } from './catalogo-service.service';

@Module({
  imports: [],
  controllers: [CatalogoServiceController],
  providers: [CatalogoServiceService],
})
export class CatalogoServiceModule {}

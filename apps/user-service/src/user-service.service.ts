import { Injectable } from '@nestjs/common';
import { CreateLocalidadDto } from './dto/create-localidad.dto';
import { UpdateLocalidadDto } from './dto/update-localidad.dto';
import { LocalidadRepository } from './lib/localidad.repository';
import { Localidad } from './models/localidad.model';

@Injectable()
export class UserServiceService {
  constructor(private readonly localidadRepository: LocalidadRepository) {}

  findAll(): Promise<Localidad[]> {
    return this.localidadRepository.findAll();
  }

  findOne(id: number): Promise<Localidad> {
    return this.localidadRepository.findOne(id);
  }

  create(createLocalidadDto: CreateLocalidadDto): Promise<Localidad> {
    return this.localidadRepository.create(createLocalidadDto);
  }

  update(id: number, updateLocalidadDto: UpdateLocalidadDto): Promise<Localidad> {
    return this.localidadRepository.update(id, updateLocalidadDto);
  }

  remove(id: number): Promise<Localidad> {
    return this.localidadRepository.remove(id);
  }
}

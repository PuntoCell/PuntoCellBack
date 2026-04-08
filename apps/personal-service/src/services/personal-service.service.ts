import { Injectable } from '@nestjs/common';
import { CreateRolDto } from '../dto/create-rol.dto';
import { UpdateRolDto } from '../dto/update-rol.dto';
import { CreatePermisoDto } from '../dto/create-permiso.dto';
import { UpdatePermisoDto } from '../dto/update-permiso.dto';
import { Rol } from '../models/rol.model';
import { Permiso } from '../models/permiso.model';
import { RolRepository } from '../daos/rol.repository';
import { PermisoRepository } from '../daos/permiso.repository';

@Injectable()
export class PersonalServiceService {
  constructor(
    private readonly rolRepository: RolRepository,
    private readonly permisoRepository: PermisoRepository,
  ) {}

  // Roles
  findAllRoles(): Promise<Rol[]> {
    return this.rolRepository.findAll();
  }

  findOneRol(id: number): Promise<Rol> {
    return this.rolRepository.findOne(id);
  }

  createRol(dto: CreateRolDto): Promise<Rol> {
    return this.rolRepository.create(dto);
  }

  updateRol(id: number, dto: UpdateRolDto): Promise<Rol> {
    return this.rolRepository.update(id, dto);
  }

  removeRol(id: number): Promise<Rol> {
    return this.rolRepository.remove(id);
  }

  // Permisos
  findAllPermisos(): Promise<Permiso[]> {
    return this.permisoRepository.findAll();
  }

  findOnePermiso(id: number): Promise<Permiso> {
    return this.permisoRepository.findOne(id);
  }

  createPermiso(dto: CreatePermisoDto): Promise<Permiso> {
    return this.permisoRepository.create(dto);
  }

  updatePermiso(id: number, dto: UpdatePermisoDto): Promise<Permiso> {
    return this.permisoRepository.update(id, dto);
  }

  removePermiso(id: number): Promise<Permiso> {
    return this.permisoRepository.remove(id);
  }
}

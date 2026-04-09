import { Injectable } from '@nestjs/common';
import { CreateRolDto } from '../dto/create-rol.dto';
import { UpdateRolDto } from '../dto/update-rol.dto';
import { CreatePermisoDto } from '../dto/create-permiso.dto';
import { UpdatePermisoDto } from '../dto/update-permiso.dto';
import { Rol } from '../models/rol.model';
import { Permiso } from '../models/permiso.model';
import { RolRepository } from '../daos/rol.repository';
import { PermisoRepository } from '../daos/permiso.repository';
import { RolPermisoRepository } from '../daos/rol-permiso.repository';

@Injectable()
export class PersonalServiceService {
  constructor(
    private readonly rolRepository: RolRepository,
    private readonly permisoRepository: PermisoRepository,
    private readonly rolPermisoRepository?: RolPermisoRepository,
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

  // Rol-Permiso assignments
  async assignPermisoToRol(dto: { idRol: number; idPermiso: number }) {
    if (!this.rolPermisoRepository) throw new Error('RolPermisoRepository not provided');
    await this.rolRepository.findOne(dto.idRol);
    await this.permisoRepository.findOne(dto.idPermiso);
    return this.rolPermisoRepository.create(dto as any);
  }

  async listPermisosDeRol(idRol: number): Promise<Permiso[]> {
    if (!this.rolPermisoRepository) throw new Error('RolPermisoRepository not provided');
    await this.rolRepository.findOne(idRol);
    const asigns = await this.rolPermisoRepository.findByRole(idRol);
    const permisos: Permiso[] = [];
    for (const a of asigns) {
      permisos.push(await this.permisoRepository.findOne(a.idPermiso));
    }
    return permisos;
  }

  async removePermisoFromRol(idRol: number, idPermiso: number) {
    if (!this.rolPermisoRepository) throw new Error('RolPermisoRepository not provided');
    return this.rolPermisoRepository.removeByRoleAndPermiso(idRol, idPermiso);
  }
}

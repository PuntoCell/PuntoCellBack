import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermisoDto } from '../dto/create-permiso.dto';
import { UpdatePermisoDto } from '../dto/update-permiso.dto';
import { Permiso } from '../models/permiso.model';

@Injectable()
export class PermisoRepository {
  private items: Permiso[] = [];
  private nextId = 1;

  async findAll(): Promise<Permiso[]> {
    return this.items.slice();
  }

  async findOne(id: number): Promise<Permiso> {
    const p = this.items.find((r) => r.id === id);
    if (!p) throw new NotFoundException(`No existe permiso con id ${id}`);
    return p;
  }

  async create(dto: CreatePermisoDto): Promise<Permiso> {
    if (this.items.some((r) => r.recurso === dto.recurso && r.accion === dto.accion)) {
      throw new ConflictException('El permiso ya existe');
    }

    const permiso = {
      id: this.nextId++,
      recurso: dto.recurso,
      accion: dto.accion,
      nombre: dto.nombre,
    } as Permiso;

    this.items.push(permiso);
    return permiso;
  }

  async update(id: number, dto: UpdatePermisoDto): Promise<Permiso> {
    const permiso = await this.findOne(id);
    if (dto.recurso !== undefined) permiso.recurso = dto.recurso;
    if (dto.accion !== undefined) permiso.accion = dto.accion;
    if (dto.nombre !== undefined) permiso.nombre = dto.nombre;
    return permiso;
  }

  async remove(id: number): Promise<Permiso> {
    const permiso = await this.findOne(id);
    this.items = this.items.filter((r) => r.id !== id);
    return permiso;
  }
}

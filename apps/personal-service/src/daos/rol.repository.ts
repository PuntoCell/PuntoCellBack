import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolDto } from '../dto/create-rol.dto';
import { UpdateRolDto } from '../dto/update-rol.dto';
import { Rol } from '../models/rol.model';

@Injectable()
export class RolRepository {
  private items: Rol[] = [];
  private nextId = 1;

  async findAll(): Promise<Rol[]> {
    return this.items.slice();
  }

  async findOne(id: number): Promise<Rol> {
    const rol = this.items.find((r) => r.id === id);
    if (!rol) throw new NotFoundException(`No existe rol con id ${id}`);
    return rol;
  }

  async create(dto: CreateRolDto): Promise<Rol> {
    if (this.items.some((r) => r.nombre === dto.nombre)) {
      throw new ConflictException('El rol ya existe');
    }

    const rol: Rol = {
      id: this.nextId++,
      nombre: dto.nombre,
      activo: dto.activo ?? true,
    };

    this.items.push(rol);
    return rol;
  }

  async update(id: number, dto: UpdateRolDto): Promise<Rol> {
    const rol = await this.findOne(id);
    if (dto.nombre !== undefined) rol.nombre = dto.nombre;
    if (dto.activo !== undefined) rol.activo = dto.activo;
    return rol;
  }

  async remove(id: number): Promise<Rol> {
    const rol = await this.findOne(id);
    this.items = this.items.filter((r) => r.id !== id);
    return rol;
  }
}

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolDto } from '../dto/create-rol.dto';
import { UpdateRolDto } from '../dto/update-rol.dto';
import { Rol } from '../models/rol.model';
import { PrismaService } from '../lib/prisma.service';

@Injectable()
export class RolRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Rol[]> {
    return this.prisma.rol.findMany();
  }

  async findOne(id: number): Promise<Rol> {
    const rol = await this.prisma.rol.findUnique({ where: { id } });
    if (!rol) throw new NotFoundException(`No existe rol con id ${id}`);
    return rol as Rol;
  }

  async create(dto: CreateRolDto): Promise<Rol> {
    const exists = await this.prisma.rol.findFirst({ where: { nombre: dto.nombre } });
    if (exists) throw new ConflictException('El rol ya existe');
    const rol = await this.prisma.rol.create({ data: { nombre: dto.nombre, activo: dto.activo ?? true } });
    return rol as Rol;
  }

  async update(id: number, dto: UpdateRolDto): Promise<Rol> {
    await this.findOne(id);
    const rol = await this.prisma.rol.update({ where: { id }, data: { nombre: dto.nombre, activo: dto.activo } });
    return rol as Rol;
  }

  async remove(id: number): Promise<Rol> {
    const rol = await this.findOne(id);
    await this.prisma.rol.delete({ where: { id } });
    return rol as Rol;
  }
}

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermisoDto } from '../dto/create-permiso.dto';
import { UpdatePermisoDto } from '../dto/update-permiso.dto';
import { Permiso } from '../models/permiso.model';
import { PrismaService } from '../lib/prisma.service';

@Injectable()
export class PermisoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Permiso[]> {
    return this.prisma.permiso.findMany();
  }

  async findOne(id: number): Promise<Permiso> {
    const p = await this.prisma.permiso.findUnique({ where: { id } });
    if (!p) throw new NotFoundException(`No existe permiso con id ${id}`);
    return p as Permiso;
  }

  async create(dto: CreatePermisoDto): Promise<Permiso> {
    const exists = await this.prisma.permiso.findFirst({ where: { recurso: dto.recurso, accion: dto.accion } });
    if (exists) throw new ConflictException('El permiso ya existe');
    const permiso = await this.prisma.permiso.create({ data: { recurso: dto.recurso, accion: dto.accion, nombre: dto.nombre } });
    return permiso as Permiso;
  }

  async update(id: number, dto: UpdatePermisoDto): Promise<Permiso> {
    await this.findOne(id);
    const permiso = await this.prisma.permiso.update({ where: { id }, data: { recurso: dto.recurso, accion: dto.accion, nombre: dto.nombre } });
    return permiso as Permiso;
  }

  async remove(id: number): Promise<Permiso> {
    const permiso = await this.findOne(id);
    await this.prisma.permiso.delete({ where: { id } });
    return permiso as Permiso;
  }
}

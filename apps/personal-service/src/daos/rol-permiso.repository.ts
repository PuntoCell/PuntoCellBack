import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolPermisoDto } from '../dto/create-rol-permiso.dto';
import { RolPermiso } from '../models/rol-permiso.model';
import { PrismaService } from '../lib/prisma.service';

@Injectable()
export class RolPermisoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<RolPermiso[]> {
    return this.prisma.rolPermiso.findMany();
  }

  async findOne(id: number): Promise<RolPermiso> {
    const rp = await this.prisma.rolPermiso.findUnique({ where: { id } });
    if (!rp) throw new NotFoundException(`No existe asignacion con id ${id}`);
    return rp as RolPermiso;
  }

  async findByRole(idRol: number): Promise<RolPermiso[]> {
    return this.prisma.rolPermiso.findMany({ where: { rolId: idRol } });
  }

  async findByRoleAndPermiso(idRol: number, idPermiso: number): Promise<RolPermiso | undefined> {
    return this.prisma.rolPermiso.findFirst({ where: { rolId: idRol, permisoId: idPermiso } });
  }

  async create(dto: CreateRolPermisoDto): Promise<RolPermiso> {
    const exists = await this.findByRoleAndPermiso(dto.idRol, dto.idPermiso);
    if (exists) throw new ConflictException('La asignación ya existe');
    const rp = await this.prisma.rolPermiso.create({ data: { rolId: dto.idRol, permisoId: dto.idPermiso } });
    return rp as RolPermiso;
  }

  async removeById(id: number): Promise<RolPermiso> {
    const rp = await this.findOne(id);
    await this.prisma.rolPermiso.delete({ where: { id } });
    return rp as RolPermiso;
  }

  async removeByRoleAndPermiso(idRol: number, idPermiso: number): Promise<RolPermiso> {
    const rp = await this.findByRoleAndPermiso(idRol, idPermiso);
    if (!rp) throw new NotFoundException('Asignación no encontrada');
    await this.prisma.rolPermiso.delete({ where: { id: rp.id } });
    return rp as RolPermiso;
  }
}

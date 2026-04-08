import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateLocalidadDto } from '../dto/create-localidad.dto';
import { UpdateLocalidadDto } from '../dto/update-localidad.dto';
import { Localidad } from '../models/localidad.model';
import { PrismaService } from './prisma.service';

@Injectable()
export class LocalidadRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Localidad[]> {
    return this.prismaService.localidad.findMany({
      orderBy: { nombre: 'asc' },
    });
  }

  async findOne(id: number): Promise<Localidad> {
    const localidad = await this.prismaService.localidad.findUnique({
      where: { id },
    });

    if (!localidad) {
      throw new NotFoundException(`No existe una localidad con id ${id}`);
    }

    return localidad;
  }

  async create(createLocalidadDto: CreateLocalidadDto): Promise<Localidad> {
    try {
      return await this.prismaService.localidad.create({
        data: {
          nombre: createLocalidadDto.nombre,
        },
      });
    } catch (error) {
      this.handleSqlError(error);
    }
  }

  async update(id: number, updateLocalidadDto: UpdateLocalidadDto): Promise<Localidad> {
    await this.findOne(id);

    try {
      return await this.prismaService.localidad.update({
        where: { id },
        data: {
          ...(updateLocalidadDto.nombre !== undefined
            ? { nombre: updateLocalidadDto.nombre }
            : {}),
        },
      });
    } catch (error) {
      this.handleSqlError(error);
    }
  }

  async remove(id: number): Promise<Localidad> {
    await this.findOne(id);

    return this.prismaService.localidad.delete({
      where: { id },
    });
  }

  private handleSqlError(error: unknown): never {
    if (this.isDuplicateKeyError(error)) {
      throw new ConflictException('La localidad viola una restriccion unica en la base');
    }

    if (this.isNotFoundError(error)) {
      throw new NotFoundException('No existe la localidad solicitada');
    }

    throw error;
  }

  private isDuplicateKeyError(error: unknown): boolean {
    return (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    );
  }

  private isNotFoundError(error: unknown): boolean {
    if (!(error instanceof PrismaClientKnownRequestError)) {
      return false;
    }

    return error.code === 'P2025';
  }
}
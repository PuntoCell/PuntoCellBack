import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PersonalServiceService } from '../services/personal-service.service';
import { CreateRolDto } from '../dto/create-rol.dto';
import { UpdateRolDto } from '../dto/update-rol.dto';
import { Rol } from '../models/rol.model';
import { CreatePermisoDto } from '../dto/create-permiso.dto';
import { UpdatePermisoDto } from '../dto/update-permiso.dto';
import { Permiso } from '../models/permiso.model';

@ApiTags('personal')
@Controller()
export class PersonalServiceController {
  constructor(private readonly personalServiceService: PersonalServiceService) {}

  // Roles
  @Get('roles')
  @ApiOperation({ summary: 'Listar roles' })
  @ApiOkResponse({ type: Rol, isArray: true })
  findAllRoles(): Promise<Rol[]> {
    return this.personalServiceService.findAllRoles();
  }

  @Get('roles/:id')
  @ApiOperation({ summary: 'Obtener rol por id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: Rol })
  findOneRol(@Param('id', ParseIntPipe) id: number): Promise<Rol> {
    return this.personalServiceService.findOneRol(id);
  }

  @Post('roles')
  @ApiOperation({ summary: 'Crear rol' })
  @ApiBody({ type: CreateRolDto })
  @ApiCreatedResponse({ type: Rol })
  createRol(@Body() dto: CreateRolDto): Promise<Rol> {
    return this.personalServiceService.createRol(dto);
  }

  @Put('roles/:id')
  @ApiOperation({ summary: 'Actualizar rol' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateRolDto })
  @ApiOkResponse({ type: Rol })
  updateRol(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRolDto,
  ): Promise<Rol> {
    return this.personalServiceService.updateRol(id, dto);
  }

  @Patch('roles/:id')
  @ApiOperation({ summary: 'Actualizar parcialmente rol' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateRolDto })
  @ApiOkResponse({ type: Rol })
  partialUpdateRol(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRolDto,
  ): Promise<Rol> {
    return this.personalServiceService.updateRol(id, dto);
  }

  @Delete('roles/:id')
  @ApiOperation({ summary: 'Eliminar rol' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: Rol })
  removeRol(@Param('id', ParseIntPipe) id: number): Promise<Rol> {
    return this.personalServiceService.removeRol(id);
  }

  // Permisos
  @Get('permisos')
  @ApiOperation({ summary: 'Listar permisos' })
  @ApiOkResponse({ type: Permiso, isArray: true })
  findAllPermisos(): Promise<Permiso[]> {
    return this.personalServiceService.findAllPermisos();
  }

  @Get('permisos/:id')
  @ApiOperation({ summary: 'Obtener permiso por id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: Permiso })
  findOnePermiso(@Param('id', ParseIntPipe) id: number): Promise<Permiso> {
    return this.personalServiceService.findOnePermiso(id);
  }

  @Post('permisos')
  @ApiOperation({ summary: 'Crear permiso' })
  @ApiBody({ type: CreatePermisoDto })
  @ApiCreatedResponse({ type: Permiso })
  createPermiso(@Body() dto: CreatePermisoDto): Promise<Permiso> {
    return this.personalServiceService.createPermiso(dto);
  }

  @Put('permisos/:id')
  @ApiOperation({ summary: 'Actualizar permiso' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdatePermisoDto })
  @ApiOkResponse({ type: Permiso })
  updatePermiso(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePermisoDto,
  ): Promise<Permiso> {
    return this.personalServiceService.updatePermiso(id, dto);
  }

  @Patch('permisos/:id')
  @ApiOperation({ summary: 'Actualizar parcialmente permiso' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdatePermisoDto })
  @ApiOkResponse({ type: Permiso })
  partialUpdatePermiso(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePermisoDto,
  ): Promise<Permiso> {
    return this.personalServiceService.updatePermiso(id, dto);
  }

  @Delete('permisos/:id')
  @ApiOperation({ summary: 'Eliminar permiso' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: Permiso })
  removePermiso(@Param('id', ParseIntPipe) id: number): Promise<Permiso> {
    return this.personalServiceService.removePermiso(id);
  }
}

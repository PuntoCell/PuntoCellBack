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
import { CreateRolPermisoDto } from '../dto/create-rol-permiso.dto';
import { RolPermiso } from '../models/rol-permiso.model';

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

  // Rol <-> Permiso assignments
  @Post('roles/:idRol/permisos')
  @ApiOperation({ summary: 'Asignar permiso a rol' })
  @ApiParam({ name: 'idRol', type: Number })
  @ApiBody({ type: CreateRolPermisoDto })
  @ApiCreatedResponse({ type: RolPermiso })
  async assignPermisoToRol(
    @Param('idRol', ParseIntPipe) idRol: number,
    @Body() dto: CreateRolPermisoDto,
  ): Promise<RolPermiso> {
    const assignDto = { idRol, idPermiso: dto.idPermiso };
    return this.personalServiceService.assignPermisoToRol(assignDto as any);
  }

  @Get('roles/:idRol/permisos')
  @ApiOperation({ summary: 'Listar permisos asignados a un rol' })
  @ApiParam({ name: 'idRol', type: Number })
  @ApiOkResponse({ type: Permiso, isArray: true })
  listPermisosDeRol(@Param('idRol', ParseIntPipe) idRol: number): Promise<Permiso[]> {
    return this.personalServiceService.listPermisosDeRol(idRol);
  }

  @Delete('roles/:idRol/permisos/:idPermiso')
  @ApiOperation({ summary: 'Remover permiso de un rol' })
  @ApiParam({ name: 'idRol', type: Number })
  @ApiParam({ name: 'idPermiso', type: Number })
  @ApiOkResponse({ type: RolPermiso })
  removePermisoFromRol(
    @Param('idRol', ParseIntPipe) idRol: number,
    @Param('idPermiso', ParseIntPipe) idPermiso: number,
  ) {
    return this.personalServiceService.removePermisoFromRol(idRol, idPermiso);
  }
}

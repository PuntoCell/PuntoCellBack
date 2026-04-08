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
import { CreateLocalidadDto } from '../dto/create-localidad.dto';
import { UpdateLocalidadDto } from '../dto/update-localidad.dto';
import { Localidad } from '../models/localidad.model';
import { UserServiceService } from '../services/user-service.service';

@ApiTags('localidades')
@Controller('localidades')
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Get()
  @ApiOperation({ summary: 'Listar localidades' })
  @ApiOkResponse({ type: Localidad, isArray: true })
  findAll(): Promise<Localidad[]> {
    return this.userServiceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una localidad por id' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: Localidad })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Localidad> {
    return this.userServiceService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una localidad' })
  @ApiBody({ type: CreateLocalidadDto })
  @ApiCreatedResponse({ type: Localidad })
  create(@Body() createLocalidadDto: CreateLocalidadDto): Promise<Localidad> {
    return this.userServiceService.create(createLocalidadDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una localidad completa' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiBody({ type: UpdateLocalidadDto })
  @ApiOkResponse({ type: Localidad })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLocalidadDto: UpdateLocalidadDto,
  ): Promise<Localidad> {
    return this.userServiceService.update(id, updateLocalidadDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente una localidad' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiBody({ type: UpdateLocalidadDto })
  @ApiOkResponse({ type: Localidad })
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLocalidadDto: UpdateLocalidadDto,
  ): Promise<Localidad> {
    return this.userServiceService.update(id, updateLocalidadDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una localidad' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: Localidad })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Localidad> {
    return this.userServiceService.remove(id);
  }
}

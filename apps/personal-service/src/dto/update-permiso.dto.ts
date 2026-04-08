import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePermisoDto {
	@ApiPropertyOptional({ example: 'usuarios' })
	@IsOptional()
	@IsString()
	recurso?: string;

	@ApiPropertyOptional({ example: 'create' })
	@IsOptional()
	@IsString()
	accion?: string;

	@ApiPropertyOptional({ example: 'Permite crear usuarios' })
	@IsOptional()
	@IsString()
	nombre?: string;
}

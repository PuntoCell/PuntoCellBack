import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateRolDto {
	@ApiPropertyOptional({ example: 'ADMIN' })
	@IsOptional()
	@IsString()
	nombre?: string;

	@ApiPropertyOptional({ example: true })
	@IsOptional()
	@IsBoolean()
	activo?: boolean;
}

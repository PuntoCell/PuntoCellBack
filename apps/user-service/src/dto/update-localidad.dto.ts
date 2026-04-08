import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateLocalidadDto {
  @ApiPropertyOptional({ example: 'Cordoba', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;
}
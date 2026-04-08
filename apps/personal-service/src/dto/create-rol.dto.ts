import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRolDto {
  @ApiProperty({ example: 'ADMIN', description: 'Nombre del rol' })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({ example: true, description: 'Activo' })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

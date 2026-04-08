import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePermisoDto {
  @ApiProperty({ example: 'usuarios', description: 'Recurso' })
  @IsString()
  @IsNotEmpty()
  recurso!: string;

  @ApiProperty({ example: 'create', description: 'Accion' })
  @IsString()
  @IsNotEmpty()
  accion!: string;

  @ApiProperty({ example: 'Permite crear usuarios', description: 'Descripcion' })
  @IsOptional()
  @IsString()
  nombre?: string;
}

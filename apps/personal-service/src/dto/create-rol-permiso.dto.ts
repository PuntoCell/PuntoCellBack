import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateRolPermisoDto {
  @ApiProperty({ example: 1, description: 'Id del rol' })
  @IsInt()
  @IsNotEmpty()
  idRol!: number;

  @ApiProperty({ example: 2, description: 'Id del permiso' })
  @IsInt()
  @IsNotEmpty()
  idPermiso!: number;
}

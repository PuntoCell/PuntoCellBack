import { ApiProperty } from '@nestjs/swagger';

export class Permiso {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'usuarios' })
  recurso!: string;

  @ApiProperty({ example: 'create' })
  accion!: string;

  @ApiProperty({ example: 'Permite crear usuarios' })
  nombre?: string;
}

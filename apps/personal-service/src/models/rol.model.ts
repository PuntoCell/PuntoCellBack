import { ApiProperty } from '@nestjs/swagger';

export class Rol {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'ADMIN' })
  nombre!: string;

  @ApiProperty({ example: true })
  activo!: boolean;
}

import { ApiProperty } from '@nestjs/swagger';

export class Localidad {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Capital Federal' })
  nombre!: string;
}
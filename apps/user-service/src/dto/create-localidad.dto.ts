import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateLocalidadDto {
  @ApiProperty({ example: 'Rosario', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre!: string;
}
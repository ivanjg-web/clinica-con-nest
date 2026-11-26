import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateMedicoDto {
  @ApiProperty({ description: 'Nombre del médico', example: 'Carlos Pérez' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name!: string;

  @ApiProperty({
    description: 'Identificador de la especialidad',
    example: 1,
  })
  @IsInt({ message: 'El identificador de la especialidad debe ser entero' })
  @IsPositive({ message: 'El identificador debe ser mayor que cero' })
  specialtyId!: number;
}

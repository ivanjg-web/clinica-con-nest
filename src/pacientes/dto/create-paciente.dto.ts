import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePacienteDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name!: string;

  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  email!: string;

  @IsDateString({}, { message: 'La fecha debe ser una fecha válida' })
  birthDate!: string;
}

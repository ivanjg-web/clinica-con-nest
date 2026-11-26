import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { CreatePacienteDto } from './dto/create-paciente.dto.js';
import { UpdatePacienteDto } from './dto/update-paciente.dto.js';

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.patient.findMany();
  }

  findOne(id: number) {
    return this.prisma.patient.findUnique({
      where: { id },
    });
  }

  create(data: CreatePacienteDto) {
    const fechaNacimiento = new Date(data.birthDate);

    if (fechaNacimiento > new Date()) {
      throw new BadRequestException(
        'La fecha de nacimiento no puede ser futura',
      );
    }

    return this.prisma.patient.create({
      data: {
        ...data,
        birthDate: fechaNacimiento,
      },
    });
  }

  update(id: number, data: UpdatePacienteDto) {
    if (data.birthDate) {
      const fechaNacimiento = new Date(data.birthDate);

      if (fechaNacimiento > new Date()) {
        throw new BadRequestException(
          'La fecha de nacimiento no puede ser futura',
        );
      }

      return this.prisma.patient.update({
        where: { id },
        data: {
          ...data,
          birthDate: fechaNacimiento,
        },
      });
    }

    return this.prisma.patient.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.patient.delete({
      where: { id },
    });
  }
}

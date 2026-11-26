import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { PacientesService } from './pacientes.service.js';
import { CreatePacienteDto } from './dto/create-paciente.dto.js';
import { UpdatePacienteDto } from './dto/update-paciente.dto.js';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Get()
  FindAll() {
    return this.pacientesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const paciente = await this.pacientesService.findOne(Number(id));

    if (!paciente) {
      throw new NotFoundException(`Paciente con id: ${id} no encontrado`);
    }

    return paciente;
  }

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.create(createPacienteDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    const paciente = await this.pacientesService.findOne(Number(id));

    if (!paciente) {
      throw new NotFoundException(`Paciente con id: ${id} no encontrado`);
    }

    return this.pacientesService.update(Number(id), updatePacienteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const paciente = await this.pacientesService.findOne(Number(id));

    if (!paciente) {
      throw new NotFoundException(`Paciente con id: ${id} no encontrado`);
    }

    return this.pacientesService.remove(Number(id));
  }
}

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
import { MedicosService } from './medicos.service.js';
import { CreateMedicoDto } from './dto/create-medico.dto.js';
import { UpdateMedicoDto } from './dto/update-medico.dto.js';

@Controller('medicos')
export class MedicosController {
  constructor(private readonly MedicosService: MedicosService) {}

  @Get()
  findAll() {
    return this.MedicosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const medico = await this.MedicosService.findOne(Number(id));

    if (!medico) {
      throw new NotFoundException(`Médico con id: ${id} no encontrado`);
    }

    return medico;
  }

  @Post()
  create(@Body() createMedicoDto: CreateMedicoDto) {
    return this.MedicosService.create(createMedicoDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMedicoDto: UpdateMedicoDto,
  ) {
    const medico = await this.MedicosService.findOne(Number(id));

    if (!medico) {
      throw new NotFoundException(`Médico con id: ${id} no encontrado`);
    }

    return this.MedicosService.update(Number(id), updateMedicoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const medico = await this.MedicosService.findOne(Number(id));

    if (!medico) {
      throw new NotFoundException(`Médico con id: ${id} no encontrado`);
    }

    return this.MedicosService.remove(Number(id));
  }
}

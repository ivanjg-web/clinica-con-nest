import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { MedicosService } from './medicos.service.js';
import { CreateMedicoDto } from './dto/create-medico.dto.js';
import { UpdateMedicoDto } from './dto/update-medico.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('medicos')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('RECEPCIONISTA', 'GERENCIA')
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

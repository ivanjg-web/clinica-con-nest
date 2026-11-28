import { Module } from '@nestjs/common';
import { PacientesController } from './pacientes.controller.js';
import { PacientesService } from './pacientes.service.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [PacientesController],
  providers: [PacientesService],
})
export class PacientesModule {}

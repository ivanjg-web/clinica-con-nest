import { Module } from '@nestjs/common';
import { MedicosController } from './medicos.controller.js';
import { MedicosService } from './medicos.service.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [MedicosController],
  providers: [MedicosService],
})
export class MedicosModule {}

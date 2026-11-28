import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Role } from '../generated/prisma/client.js';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: { email: string; password: string; role: Role }) {
    return this.authService.register(body.email, body.password, body.role);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string; role: string }) {
    return this.authService.login(body.email, body.password);
  }
}

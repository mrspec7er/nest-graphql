import { Controller, Req, Post, UseGuards } from '@nestjs/common';
// import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Req() req: Request) {
    const { email, password } = req.body;
    return this.authService.login({ email, password });
  }
}

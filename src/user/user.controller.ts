import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
    }
  }
}

export interface RegisterReqType {
  name: string;
  username: string;
  email: string;
  password: string;
}
export interface UpdateUserOrganizationReqType {
  _id: string;
  usersID: string;
}

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  getAll(): Promise<any[]> {
    return this.userService.getAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/my-profile')
  getOne(@Req() req: Request) {
    return this.userService.getOne({ email: req.user?.email });
  }

  @Post('/users')
  register(@Req() req: Request) {
    const { name, username, email, password } = req.body;
    return this.userService.register({ name, username, email, password });
  }
}

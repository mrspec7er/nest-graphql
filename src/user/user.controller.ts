import { Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';

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
  getHello(): Promise<any[]> {
    return this.userService.getAll();
  }

  @Post('/users')
  register(@Req() req: any) {
    const { name, username, email, password } = req.body;
    return this.userService.register({ name, username, email, password });
  }
}

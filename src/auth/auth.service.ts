import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getOne({ email });
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: { email: string; password: string }) {
    const userPayload = await this.validateUser(user.email, user.password);

    const payload = { email: userPayload.email, id: userPayload._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

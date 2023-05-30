import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { RegisterReqType } from './user.controller';

@Injectable()
export class UserService {
  async getAll() {
    const user = await User.find();
    return user;
  }

  async getOne({ email }) {
    return await User.findOne({ email });
  }

  async register({ name, username, email, password }: RegisterReqType) {
    const encryptedPassword = await bcrypt.hash(password, 11);
    const newUser = new User({
      name,
      email,
      password: encryptedPassword,
      username,
    });

    const insertUser = await newUser.save();
    return insertUser;
  }
}

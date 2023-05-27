import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import {
  User as UserType,
  CreateUserInput,
  UpdateUserOrganizationInput,
} from '../graphql';

@Injectable()
export class UserService {
  async getAll(): Promise<UserType[]> {
    return await User.find();
  }

  async getOne({ email }): Promise<UserType> {
    return await User.findOne({ email }).exec();
  }

  async register({
    name,
    username,
    email,
    password,
  }: CreateUserInput): Promise<UserType> {
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

  async updateOrganization({ id, userId }: UpdateUserOrganizationInput) {
    const userOrganizations = (await User.findById(userId))?.organizations;

    if (Array.isArray(userOrganizations)) {
      await User.updateOne(
        { _id: userId },
        { $set: { organizations: [...userOrganizations, id] } },
      );
    }

    return id;
  }
}

import { Injectable } from '@nestjs/common';
import { User as UserModel } from './user.model';
import * as bcrypt from 'bcrypt';
import { User, CreateUserInput, UpdateUserOrganizationInput } from '../graphql';

@Injectable()
export class UserService {
  async getAll() {
    const user = await UserModel.find();
    return user;
  }

  async getOne({ email }) {
    return await UserModel.findOne({ email });
  }

  async register({
    name,
    username,
    email,
    password,
  }: CreateUserInput): Promise<User> {
    const encryptedPassword = await bcrypt.hash(password, 11);
    const newUser = new UserModel({
      name,
      email,
      password: encryptedPassword,
      username,
    });

    return await newUser.save();
  }

  async updateOrganization({ id, userId }: UpdateUserOrganizationInput) {
    const userOrganizations = (await UserModel.findById(userId))?.organizations;

    if (Array.isArray(userOrganizations)) {
      await UserModel.updateOne(
        { _id: userId },
        { $set: { organizations: [...userOrganizations, id] } },
      );
    }

    return id;
  }
}

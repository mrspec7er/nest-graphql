import { Injectable, Inject } from '@nestjs/common';
import { Organization } from './organization.model';
import {
  Organization as OrganizationType,
  CreateOrganizationInput,
} from '../graphql';
import { UserService } from '../user/user.service';

@Injectable()
export class OrganizationService {
  @Inject(UserService)
  private readonly userService: UserService;

  async getAll(): Promise<OrganizationType[]> {
    return await Organization.find();
  }

  async create({
    name,
    userId,
  }: {
    name: string;
    userId: string;
  }): Promise<OrganizationType> {
    const newUser = new Organization({
      name,
    });

    const insertOrg = await newUser.save();

    this.userService.updateOrganization({ id: insertOrg.id, userId });

    return {
      name: insertOrg.name,
      created: String(insertOrg.created),
      updated: String(insertOrg.updated),
    };
  }
}

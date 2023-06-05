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
    const newOrg = new Organization({
      name,
      users: [userId],
    });

    const organization = await newOrg.save();

    this.userService.updateOrganization({ id: organization.id, userId });

    return {
      name: organization.name,
      created: String(organization.created),
      updated: String(organization.updated),
    };
  }

  async updateMember({ id, userId }: { id: string; userId: string }) {
    const organizationMember = (await Organization.findById(id))?.users;

    if (Array.isArray(organizationMember)) {
      await Organization.updateOne(
        { _id: userId },
        { $set: { users: [...organizationMember, userId] } },
      );
    }

    return id;
  }
}

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
<<<<<<< src/organization/organization.service.ts
  }: {
    name: string;
    userId: string;
  }): Promise<OrganizationType> {
    const newUser = new Organization({
=======
  }: CreateOrganizationInput): Promise<OrganizationType> {
    const newOrganization = new Organization({
>>>>>>> src/organization/organization.service.ts
      name,
    });

    const organization = await newOrganization.save();

    this.userService.updateOrganization({ id: organization.id, userId });

    return {
      name: organization.name,
      created: String(organization.created),
      updated: String(organization.updated),
    };
  }
}

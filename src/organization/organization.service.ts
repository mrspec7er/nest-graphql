import { Injectable, Inject } from '@nestjs/common';
import { Organization } from './organization.model';
import { Organization as OrganizationType } from '../graphql';
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
    role,
  }: {
    name: string;
    userId: string;
    role: 'OWNER' | 'MANAGER' | 'MEMBER';
  }): Promise<OrganizationType> {
    const newOrg = new Organization({
      name,
      users: [
        {
          id: userId,
          role,
          invitedAt: String(Date.now()),
        },
      ],
    });

    const organization = await newOrg.save();

    this.userService.updateOrganization({ id: organization.id, userId });

    let typeParser: any = organization;

    return typeParser;
  }

  async update({
    name,
    id,
  }: {
    name: string;
    id: string;
  }): Promise<OrganizationType> {
    const organization = await Organization.findOneAndUpdate(
      { _id: id },
      { name, updated: Date.now() },
    );

    let typeParser: any = organization;

    return typeParser;
  }

  async getMyOrganizationList({
    userId,
  }: {
    userId: string;
  }): Promise<OrganizationType[]> {
    const organization = await Organization.find({
      users: { $elemMatch: { id: userId } },
    });

    let typeParser: any = organization;

    return typeParser;
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

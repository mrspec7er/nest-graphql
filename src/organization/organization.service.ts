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
  }: {
    name: string;
    userId: string;
  }): Promise<OrganizationType> {
    const organization = await new Organization({
      name,
      users: [
        {
          id: userId,
          role: 'OWNER',
          invitedAt: new Date().toTimeString(),
        },
      ],
    }).save();

    this.userService.updateOrganization({ id: organization.id, userId });

    return organization;
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
      { name, updated: new Date().toTimeString() },
    );

    return organization;
  }

  async getMyOrganizationList({
    userId,
  }: {
    userId: string;
  }): Promise<OrganizationType[]> {
    const organization = await Organization.find({
      users: { $elemMatch: { id: userId } },
    });

    return organization;
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

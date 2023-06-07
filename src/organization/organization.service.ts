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

    this.userService.updateOrganization({
      organizationId: organization.id,
      userId,
    });

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
      { name, updatedAt: new Date().toTimeString() },
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

  // async updateMember({ id, userId }: { id: string; userId: string }) {
  //   const organizationMember = (await Organization.findById(id))?.users;

  //   if (Array.isArray(organizationMember)) {
  //     await Organization.updateOne(
  //       { _id: id },
  //       { $set: { users: [...organizationMember, userId] } },
  //     );
  //   }

  //   return id;
  // }

  async updateProject({
    organizationId,
    projectId,
  }: {
    organizationId: string;
    projectId: string;
  }) {
    const projectList = (await Organization.findById(organizationId))?.projects;

    if (Array.isArray(projectList)) {
      await Organization.updateOne(
        { _id: organizationId },
        { $set: { projects: [...projectList, projectId] } },
      );
    }

    return organizationId;
  }
}

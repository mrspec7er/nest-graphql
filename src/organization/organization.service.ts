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
    const newOrg = new Organization({
      name,
      users: [userId],
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

  async getMyOrganizationList({
    userId,
  }: {
    userId: string;
  }): Promise<OrganizationType[]> {
    const organization = await Organization.find({ users: { $in: [userId] } });

    let typeParser: any = organization;

    return typeParser;
  }
}

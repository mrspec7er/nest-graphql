import { Injectable, Inject } from '@nestjs/common';
import { Organization } from './organization.model';
import { Organization as OrganizationType } from '../graphql';
import { OrganizationEvent } from '../graphql';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ProjectEvent } from '../graphql';

@Injectable()
export class OrganizationService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

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
    const projectOwner = {
      id: userId,
      role: 'OWNER',
      invitedAt: new Date().toTimeString(),
    };
    const organization = await new Organization({
      name,
      users: [projectOwner],
    }).save();

    this.eventEmitter.emit(OrganizationEvent.OrganizationCreated, {
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
      { name },
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

  @OnEvent(ProjectEvent.ProjectCreated)
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

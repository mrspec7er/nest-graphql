import { Injectable, Inject } from '@nestjs/common';
import { Project } from './project.model';
import { Project as ProjectType } from '../graphql';
import { UserService } from '../user/user.service';
import { OrganizationService } from '../organization/organization.service';

interface UpdateProjectInputType {
  name: string;
  userId: string;
  projectId: string;
  description?: string;
}

@Injectable()
export class ProjectService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(OrganizationService)
    private readonly organizationService: OrganizationService,
  ) {}

  async getAll(): Promise<ProjectType[]> {
    return await Project.find();
  }

  async getOne({ id }): Promise<ProjectType> {
    const project = await Project.findById(id);

    return project;
  }

  async create({
    name,
    userId,
    description,
    organizationId,
  }: {
    name: string;
    userId: string;
    organizationId: string;
    description: string;
  }): Promise<ProjectType> {
    const project = await new Project({
      name,
      organizationId,
      createdBy: userId,
      description,
      users: [
        {
          id: userId,
          role: 'OWNER',
          invitedAt: new Date().toTimeString(),
        },
      ],
    }).save();

    await this.organizationService.updateProject({
      projectId: project.id,
      organizationId,
    });
    await this.userService.updateProject({ projectId: project.id, userId });

    return project;
  }

  async update({
    name,
    userId,
    description,
    projectId,
  }: UpdateProjectInputType): Promise<ProjectType> {
    const project = await Project.findOne({ _id: projectId });

    const projectOwner = project.users.find((i) => i.id === userId);

    if (!projectOwner || projectOwner.role !== 'OWNER') {
      throw new Error('Unauthorize user');
    }

    await Project.updateOne({ _id: projectId }, { name, description });

    return project;
  }

  async getMyProject({ userId }: { userId: string }): Promise<ProjectType[]> {
    const project = await Project.find({
      users: { $elemMatch: { id: userId } },
    });

    return project;
  }

  //   async updateMember({ id, userId }: { id: string; userId: string }) {
  //     const projectMember = (await Project.findById(id))?.users;

  //     if (Array.isArray(projectMember)) {
  //       await Project.updateOne(
  //         { _id: userId },
  //         { $set: { users: [...projectMember, userId] } },
  //       );
  //     }

  //     return id;
  //   }
}

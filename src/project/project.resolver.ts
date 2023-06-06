import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import {
  User,
  Project,
  CreateProjectInput,
  UpdateProjectInput,
  ProjectByIdInput,
} from '../graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/user/user.decorator';

@Resolver()
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @Query()
  project(): Promise<Project[]> {
    return this.projectService.getAll();
  }

  @Query()
  projectById(
    @Args('projectByIdInput')
    projectByIdInput: ProjectByIdInput,
  ): Promise<Project> {
    return this.projectService.getOne({ id: projectByIdInput.id });
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  createProject(
    @CurrentUser() user: User,
    @Args('createProjectInput')
    createProjectInput: CreateProjectInput,
  ): Promise<Project> {
    return this.projectService.create({
      name: createProjectInput.name,
      userId: user.id,
      description: createProjectInput.description,
      organizationId: createProjectInput.organizationId,
    });
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  updateProject(
    @CurrentUser() user: User,
    @Args('updateProjectInput')
    updateProjectInput: UpdateProjectInput,
  ): Promise<Project> {
    return this.projectService.update({
      userId: user.id,
      ...updateProjectInput,
    });
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  myProject(@CurrentUser() user: User): Promise<Project[]> {
    return this.projectService.getMyProject({ userId: user.id });
  }
}

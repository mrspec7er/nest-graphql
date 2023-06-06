import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import {
  User,
  Project,
  CreateProjectInput,
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
    id: string,
  ): Promise<Project> {
    return this.projectService.getOne(id);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  createProject(
    @CurrentUser() user: User,
    @Args('createProjectInput')
    createProjectInput: CreateProjectInput,
  ): Promise<Project> {
    return this.projectService.create({
      ...createProjectInput,
      userId: user.id,
    });
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  myProject(@CurrentUser() user: User): Promise<Project[]> {
    return this.projectService.getMyProject({ userId: user.id });
  }
}

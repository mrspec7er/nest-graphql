import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrganizationService } from './organization.service';
import { UserService } from '../user/user.service';
import {
  Organization,
  CreateOrganizationInput,
  User,
  UpdateOrganizationInput,
} from '../graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/user/user.decorator';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Resolver()
export class OrganizationResolver {
  constructor(private organizationService: OrganizationService) {}

  @Query()
  organization(): Promise<Organization[]> {
    return this.organizationService.getAll();
  }

  @Mutation()
  // @Roles('USER')
  // @UseGuards(GqlAuthGuard, RolesGuard)
  @UseGuards(GqlAuthGuard)
  createOrganization(
    @CurrentUser() user: User,
    @Args('createOrganizationInput')
    createOrganizationInput: CreateOrganizationInput,
  ): Promise<Organization> {
    return this.organizationService.create({
      name: createOrganizationInput.name,
      userId: user.id,
      role: 'OWNER',
    });
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  updateOrganization(
    @CurrentUser() user: User,
    @Args('updateOrganizationInput')
    updateOrganizationInput: UpdateOrganizationInput,
  ): Promise<Organization> {
    return this.organizationService.update(updateOrganizationInput);
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  myOrganization(@CurrentUser() user: User): Promise<Organization[]> {
    return this.organizationService.getMyOrganizationList({ userId: user.id });
  }
}

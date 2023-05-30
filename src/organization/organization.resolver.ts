import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrganizationService } from './organization.service';
import { UserService } from '../user/user.service';
import { Organization, CreateOrganizationInput, User } from '../graphql';
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

<<<<<<< src/organization/organization.resolver.ts
  @Mutation()
  @Roles('USER')
  @UseGuards(GqlAuthGuard, RolesGuard)
=======

  @Mutation()
  @UseGuards(GqlAuthGuard)

>>>>>>> src/organization/organization.resolver.ts
  createOrganization(
    @CurrentUser() user: User,
    @Args('createOrganizationInput')
    createOrganizationInput: CreateOrganizationInput,
  ): Promise<Organization> {
    return this.organizationService.create({
      name: createOrganizationInput.name,
      userId: user.id,
    });
  }
}

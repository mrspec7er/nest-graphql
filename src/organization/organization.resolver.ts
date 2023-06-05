import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrganizationService } from './organization.service';
import { UserService } from '../user/user.service';
import { Organization, CreateOrganizationInput } from '../graphql';

@Resolver()
export class OrganizationResolver {
  constructor(private organizationService: OrganizationService) {}

  @Query()
  organization(): Promise<Organization[]> {
    return this.organizationService.getAll();
  }

  @Mutation()
  createOrganization(
    @Args('createOrganizationInput')
    createOrganizationInput: CreateOrganizationInput,
  ): Promise<Organization> {
    return this.organizationService.create(createOrganizationInput);
  }
}

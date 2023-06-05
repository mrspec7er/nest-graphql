import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, CreateUserInput, Organization } from '../graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, MessageDecorator } from './user.decorator';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(private userService: UserService) {}

<<<<<<< src/user/user.resolver.ts
  @Query()
=======
 @Query()
>>>>>>> src/user/user.resolver.ts
  users(
    @MessageDecorator() msg: string,
    @CurrentUser() user: User,
  ): Promise<User[]> {
    return this.userService.getAll();
  }

  @Mutation()
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.register(createUserInput);
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  getProfileUser(@CurrentUser() user: User): Promise<User> {
    return this.userService.getOne({ email: user.email });
  }
}

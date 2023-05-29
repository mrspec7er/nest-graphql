import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, CreateUserInput } from '../graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, MessageDecorator } from './user.decorator';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [User])
  users(
    @MessageDecorator() msg: string,
    @CurrentUser() user: User,
  ): Promise<User[]> {
    return this.userService.getAll();
  }

  @Mutation((returns) => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.register(createUserInput);
  }

  @Query((returns) => User)
  @UseGuards(GqlAuthGuard)
  getProfileUser(@CurrentUser() user: User): Promise<User> {
    return this.userService.getOne({ email: user.email });
  }
}

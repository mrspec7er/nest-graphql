import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, CreateUserInput, Message, GetUserProfile } from '../graphql';

@Resolver()
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Query()
  users(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Mutation()
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.register(createUserInput);
  }

  @Query()
  getProfileUser(
    @Args('getUserProfile') getUserProfile: GetUserProfile,
  ): Promise<User> {
    return this.userService.getOne(getUserProfile);
  }
}

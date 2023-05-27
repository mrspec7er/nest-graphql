import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, CreateUserInput, Message, GetUserProfile } from '../graphql';

@Resolver()
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Mutation((returns) => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.register(createUserInput);
  }

  @Query((returns) => User)
  getProfileUser(
    @Args('getUserProfile') getUserProfile: GetUserProfile,
  ): Promise<User> {
    return this.userService.getOne(getUserProfile);
  }
}

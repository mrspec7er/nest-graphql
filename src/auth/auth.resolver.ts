import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Token, LoginInput } from '../graphql';

@Resolver()
export class UsersResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => Token)
  login(@Args('loginInput') loginInput: LoginInput): Promise<Token> {
    return this.authService.login(loginInput);
  }
}

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [],
  exports: [UserService],
  providers: [UserService, UsersResolver],
})
export class UserModule {}

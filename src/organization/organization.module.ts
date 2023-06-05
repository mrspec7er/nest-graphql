import { Module } from '@nestjs/common';
import { OrganizationResolver } from './organization.resolver';
import { OrganizationService } from './organization.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  exports: [OrganizationService],
  providers: [OrganizationService, OrganizationResolver],
})
export class OrganizationModule {}

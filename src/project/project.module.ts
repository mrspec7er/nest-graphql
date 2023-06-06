import { Module } from '@nestjs/common';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import { UserModule } from '../user/user.module';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  imports: [UserModule, OrganizationModule],
  exports: [ProjectResolver],
  providers: [ProjectService, ProjectResolver],
})
export class ProjectModule {}

import { Module } from '@nestjs/common';
import { VendorResolver } from './vendor.resolver';
import { VendorService } from './vendor.service';
import { VendorUnionResolver } from './unionResolver';

@Module({
  imports: [],
  exports: [VendorService],
  providers: [VendorService, VendorResolver, VendorUnionResolver],
})
export class VendorModule {}

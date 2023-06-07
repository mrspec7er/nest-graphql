import { Module } from '@nestjs/common';
import { VendorResolver } from './vendor.resolver';
import { VendorService } from './vendor.service';

@Module({
  imports: [],
  exports: [VendorService],
  providers: [VendorService, VendorResolver],
})
export class VendorModule {}

import { Resolver, ResolveField } from '@nestjs/graphql';
import { VendorEntities } from '../graphql';

@Resolver('Vendor')
export class VendorUnionResolver {
  @ResolveField()
  __resolveType(value) {
    if (value.venueAddress) {
      return VendorEntities.VendorVenue;
    }
    if (value.menu) {
      return VendorEntities.VendorFood;
    }
    if (value.equipments) {
      return VendorEntities.VendorEquipment;
    }
    return null;
  }
}

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VendorService } from './vendor.service';
import {
  CreateVenueInput,
  User,
  Vendor,
  CreateEquipmentInput,
  CreateFoodInput,
} from '../graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/user/user.decorator';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Resolver()
export class VendorResolver {
  constructor(private vendorService: VendorService) {}

  @Query()
  venues(): Promise<Vendor[]> {
    return this.vendorService.getVenue();
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  createVenue(
    @CurrentUser() user: User,
    @Args('createVenueInput')
    createVenueInput: CreateVenueInput,
  ) {
    console.log(createVenueInput);

    return this.vendorService.createVenue({
      ...createVenueInput,
    });
  }

  @Query()
  equipments(): Promise<Vendor[]> {
    return this.vendorService.getEquipment();
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  createEquipment(
    @CurrentUser() user: User,
    @Args('createEquipmentInput')
    createEquipmentInput: CreateEquipmentInput,
  ) {
    return this.vendorService.createEquipments({
      ...createEquipmentInput,
    });
  }

  @Query()
  foods(): Promise<Vendor[]> {
    return this.vendorService.getFood();
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  createFood(
    @CurrentUser() user: User,
    @Args('createFoodInput')
    createFoodInput: CreateFoodInput,
  ) {
    return this.vendorService.createFood({
      ...createFoodInput,
    });
  }
}

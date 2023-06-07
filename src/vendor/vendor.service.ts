import { Injectable } from '@nestjs/common';
import { Venue, Equipment, Food } from './vendor.model';
import {
  Vendor as VendorType,
  CreateVenueInput,
  CreateEquipmentInput,
  CreateFoodInput,
} from '../graphql';

@Injectable()
export class VendorService {
  async getVenue(): Promise<VendorType[]> {
    return await Venue.find();
  }

  async createVenue({
    name,
    address,
    isActive,
    phone,
    venueAddress,
    venueCoordinator,
    venuePhone,
  }: CreateVenueInput) {
    const venueVendor = await Venue.create({
      name,
      address,
      phone,
      isActive,
      venueAddress,
      venuePhone,
      venueCoordinator,
    });

    return venueVendor;
  }

  async getEquipment(): Promise<VendorType[]> {
    return await Equipment.find();
  }

  async createEquipments({
    name,
    address,
    isActive,
    phone,
    equipments,
  }: CreateEquipmentInput) {
    const equipmentsVendor = await Equipment.create({
      name,
      address,
      phone,
      isActive,
      equipments,
    });

    return equipmentsVendor;
  }

  async getFood(): Promise<VendorType[]> {
    return await Food.find();
  }

  async createFood({ name, address, isActive, phone, menu }: CreateFoodInput) {
    const foodVendor = await Food.create({
      name,
      address,
      phone,
      isActive,
      menu,
    });

    return foodVendor;
  }
}

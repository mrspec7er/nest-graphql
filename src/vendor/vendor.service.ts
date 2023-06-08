import { Injectable } from '@nestjs/common';
import { Venue, Equipment, Food, Vendor } from './vendor.model';
import {
  VendorVenue,
  VendorEquipment,
  VendorFood,
  CreateVenueInput,
  CreateEquipmentInput,
  CreateFoodInput,
  Vendor as VendorType,
} from '../graphql';

@Injectable()
export class VendorService {
  async getVendor(): Promise<VendorType[]> {
    return await Vendor.find();
  }

  async getVenue(): Promise<VendorVenue[]> {
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

  async getEquipment(): Promise<VendorEquipment[]> {
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

  async getFood(): Promise<VendorFood[]> {
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

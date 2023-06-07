import mongoose from 'mongoose';

const VendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const VenueSchema = new mongoose.Schema({
  venueAddress: {
    type: String,
    required: true,
  },
  venuePhone: {
    type: String,
    required: true,
  },
  venueCoordinator: {
    type: String,
    required: true,
  },
});

const EquipmentSchema = new mongoose.Schema({
  equipments: {
    type: Array<string>,
    default: [],
  },
});

const FoodSchema = new mongoose.Schema({
  menu: {
    type: Array<string>,
    default: [],
  },
});

const Vendor = mongoose.model('Vendor', VendorSchema);

const Venue = Vendor.discriminator('Venue', VenueSchema);

const Equipment = Vendor.discriminator('Equipment', EquipmentSchema);

const Food = Vendor.discriminator('Food', FoodSchema);

export { Venue, Equipment, Food };

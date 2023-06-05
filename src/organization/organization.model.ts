import mongoose from 'mongoose';

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: {
    type: Array<{ id: String; role: String; invitedAt: String }>,
    default: [],
  },
  projects: {
    type: Array<string>,
    default: [],
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  updated: {
    type: Date,
    default: Date.now(),
  },
});

const Organization = mongoose.model('Organization', OrganizationSchema);

export { Organization };

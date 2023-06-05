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
    type: String,
    default: new Date().toTimeString(),
  },
  updated: {
    type: String,
    default: new Date().toTimeString(),
  },
});

const Organization = mongoose.model('Organization', OrganizationSchema);

export { Organization };

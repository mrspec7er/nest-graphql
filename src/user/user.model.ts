import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    default: new Date().toTimeString(),
  },
  updated: {
    type: String,
    default: new Date().toTimeString(),
  },
  role: {
    type: String,
  },
  organizations: {
    type: Array<string>,
    default: [],
  },
  projects: {
    type: Array<string>,
    default: [],
  },
});

const User = mongoose.model('User', UserSchema);

export { User };

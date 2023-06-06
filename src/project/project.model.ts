import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    organizationId: {
      type: String,
      required: true,
    },
    users: {
      type: Array<{ id: String; role: String; invitedAt: String }>,
      default: [],
    },
    description: {
      type: String,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Project = mongoose.model('Project', ProjectSchema);

export { Project };

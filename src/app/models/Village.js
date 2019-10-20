const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const VillageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
      unique: true
    },
    active: { type: Boolean, default: true },
    createdBy: { type: ObjectId },
    updatedBy: { type: ObjectId }
  },
  { timestamps: true }
);

module.exports = VillageSchema;

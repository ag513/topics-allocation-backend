const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const TopicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
      unique: true
    },
    link: {
      type: String,
      required: true,
      trim: true,
      index: true,
      unique: true
    },
    active: {type: Boolean, default: true},
    createdBy: {type: ObjectId},
    updatedBy: {type: ObjectId}
  },
  {timestamps: true}
);

module.exports = mongoose.model('Topic', TopicSchema);

const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const PreferenceSchema = new mongoose.Schema(
  {
    studentId: {type: ObjectId, ref: 'User', unique: true},
    name: {
      type: String,
      unique: true
    },
    p1: {type: String},
    p2: {type: String},
    p3: {type: String},
    p4: {type: String},
    p5: {type: String}
  },
  {timestamps: true}
);

module.exports = mongoose.model('Preferences', PreferenceSchema);

'use strict';

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: Number,
      minlength: 1,
      required: true
    }
  },
  { timestamps: true },
  { usePushEach: true }
);

UserSchema.methods = {
  // Generating jwt after creating a user and after login
  async generateAuthToken() {
    try {
      const token = jwt.sign(
        { _id: this._id.toHexString(), email: this.email, role: this.role },
        'secret_guna',
        { expiresIn: '7d' }
      );
      return token;
    } catch (err) {
      throw err;
    }
  },
  removeUnwantedFields() {
    let { password, __v, ...rest } = this.toObject();
    return rest;
  }
};

UserSchema.statics = {
  async findByToken(token) {
    try {
      let decoded = jwt.verify(token, 'secret_guna');
      let user = await this.findOne({
        _id: decoded._id
      });
      return user;
    } catch (err) {
      throw err;
    }
  },
  async findByCredentials(email, password) {
    try {
      const user = await this.findOne({ email });
      if (!user) {
        throw 'User not found';
      }
      // Use bcrypt.compare to compare password and user.password
      if (await bcrypt.compare(password, user.password)) {
        return user;
      } else {
        throw 'Incorrect Password';
      }
    } catch (err) {
      throw err;
    }
  }
};

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('User', UserSchema);

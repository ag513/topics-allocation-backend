'use strict';

/**
 * Module dependencies.
 */
const userRouter = require('express').Router();
const User = require('../models/User');

/**
 * Load User Details
 */
const getUserDetails = async (req, res) => {
  res.send(req.user);
};

/**
 * Create user
 */
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw 'Invalid User Data';
    }
    let user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.send({ data: { user: user.removeUnwantedFields() }, token });
  } catch (err) {
    res.status(400).send(JSON.stringify(err, ['stack'], 4));
  }
};

userRouter.get('/', getUserDetails);
userRouter.post('/', createUser);

module.exports = userRouter;

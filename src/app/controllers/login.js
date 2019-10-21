/**
 * TODO:
 * Implement User LOGOUT
 */
'use strict';

/**
 * Module dependencies.
 */
const User = require('./../models/User');
const loginRouter = require('express').Router();

/**
 * User Login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await User.findByCredentials(email, password);
    const token = await userDetails.generateAuthToken();
    res.send({ data: { user: userDetails.removeUnwantedFields(), token } });
    // res.send('Logged In');
  } catch (err) {
    res.status(400).send(JSON.stringify(err, ['stack'], 4));
  }
};

loginRouter.post('/login', login);

module.exports = loginRouter;

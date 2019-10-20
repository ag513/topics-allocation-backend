/**
 * TODO:
 * Implement User LOGOUT
 */
'use strict';

/**
 * Module dependencies.
 */
const loginRouter = require('express').Router();

/**
 * User Login
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    res.send('Logged In');
  } catch (err) {
    res.status(400).send(JSON.stringify(err, ['stack'], 4));
  }
};

loginRouter.post('/login', login);

module.exports = loginRouter;

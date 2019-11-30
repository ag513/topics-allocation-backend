'use strict';

/**
 * Module dependencies.
 */
const _ = require('lodash');
const Preference = require('../models/Preferences');
const preferencesRouter = require('express').Router();
const logger = require('../../logger');

/**
 * Create a preferences
 */
const createPreference = async (req, res) => {
  try {
    let preferences = new Preference(req.body);
    await preferences.save();
    res.send(preferences);
  } catch (err) {
    logger.error(err.stack);
    res.status(400).send(err);
  }
};

/**
 * Get preferences details
 */
const getPreferences = async (req, res) => {
  try {
    const {studentId} = req.query;
    console.log(studentId);
    const preferences = await Preference.findOne({studentId});
    res.send(preferences);
  } catch (err) {
    logger.error(err.stack);
    res.status(404).json(err);
  }
};

/**
 * Update preferences details
 */
const updatePreference = async (req, res) => {
  try {
    let {id} = req.params;
    if (!id) {
      throw 'Invalid Preference ID';
    }
    let preferences = await Preference.findOneAndUpdate(
      {studentId: id},
      req.body,
      {
        new: true
      }
    );
    res.send(preferences);
  } catch (err) {
    logger.error(err.stack);
    res.status(400).json(err);
  }
};

/**
 * Delete Preference details
 */
const deletePreference = async (req, res) => {
  try {
    let {id} = req.params;
    if (!id) {
      throw 'Invalid Preference ID';
    }
    await Preference.findByIdAndDelete(id);
    res.status(204).send('');
  } catch (err) {
    logger.error(err.stack);
    res.status(400).json(err);
  }
};

preferencesRouter.get('/', getPreferences);
preferencesRouter.post('/', createPreference);
preferencesRouter.patch('/:id', updatePreference);
preferencesRouter.delete('/:id', deletePreference);

module.exports = preferencesRouter;

/**
 * TODO:
 * deleteVillage -> Only if no entires recorded for it.
 */
'use strict';

/**
 * Module dependencies.
 */
const _ = require('lodash');
const villageRouter = require('express').Router();
const logger = require('./../../logger');

/**
 * Create a village
 */
const createVillage = async (req, res) => {
  try {
    let village = await Query.post(
      req.conn.models.Village,
      pick(req.body),
      req.user
    );
    res.send(village);
  } catch (err) {
    logger.error(err.stack);
    res.status(400).json(err);
  }
};

/**
 * Get village details
 */
const getVillage = async (req, res) => {
  try {
    const { id } = req.query;
    let villages;
    if (!id) {
      villages = await Query.get(req.conn.models.Village);
    } else {
      villages = await Query.getOne(req.conn.models.Village, { _id: id });
    }
    if (!villages) {
      throw 'Village not found';
    }
    res.send(villages);
  } catch (err) {
    logger.error(err.stack);
    res.status(404).json(err);
  }
};

/**
 * Update village details
 */
const updateVillage = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) {
      throw 'Invalid Village ID';
    }
    let village = await Query.update(
      req.conn.models.Village,
      { _id: id },
      pick(req.body),
      req.user,
      { new: true }
    );
    res.send(village);
  } catch (err) {
    logger.error(err.stack);
    res.status(400).json(err);
  }
};

/**
 * Delete village details
 */
const deleteVillage = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) {
      throw 'Invalid Village ID';
    }
    let village = await Query.delete(
      req.conn.models.Village,
      {
        _id: id
      },
      req.user
    );
    res.send(village);
  } catch (err) {
    logger.error(err.stack);
    res.status(400).json(err);
  }
};

const pick = body => {
  return _.pick(body, ['name']);
};

villageRouter.get('/', getVillage);
villageRouter.post('/', createVillage);
villageRouter.patch('/:id', updateVillage);
villageRouter.delete('/:id', deleteVillage);

module.exports = villageRouter;

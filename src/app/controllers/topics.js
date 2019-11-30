'use strict';

/**
 * Module dependencies.
 */
const _ = require('lodash');
const Topic = require('../models/Topic');
const topicRouter = require('express').Router();
const logger = require('../../logger');

/**
 * Create a topic
 */
const createTopic = async (req, res) => {
  try {
    let topic = new Topic(req.body);
    await topic.save();
    res.send(topic);
  } catch (err) {
    logger.error(err.stack);
    res.status(400).send(err);
  }
};

/**
 * Get topic details
 */
const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find({active: true});
    res.send(topics);
  } catch (err) {
    logger.error(err.stack);
    res.status(404).json(err);
  }
};

/**
 * Update topic details
 */
const updateTopic = async (req, res) => {
  try {
    let {id} = req.params;
    if (!id) {
      throw 'Invalid Topic ID';
    }
    let topic = await Topic.findByIdAndUpdate(id, req.body, {new: true});
    res.send(topic);
  } catch (err) {
    logger.error(err.stack);
    res.status(400).json(err);
  }
};

/**
 * Delete Topic details
 */
const deleteTopic = async (req, res) => {
  try {
    let {id} = req.params;
    if (!id) {
      throw 'Invalid Topic ID';
    }
    await Topic.findByIdAndUpdate(id, {active: false}, {new: true});
    res.status(204).send('');
  } catch (err) {
    logger.error(err.stack);
    res.status(400).json(err);
  }
};

const pick = body => {
  return _.pick(body, ['name']);
};

topicRouter.get('/', getTopics);
topicRouter.post('/', createTopic);
topicRouter.patch('/:id', updateTopic);
topicRouter.delete('/:id', deleteTopic);

module.exports = topicRouter;

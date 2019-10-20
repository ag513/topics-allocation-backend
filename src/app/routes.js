'use strict';
/**
 * module dependencies
 */
const listEndpoints = require('express-list-endpoints');

const { authenticate } = require('./middlewares/authenticate');

/**
 * import controllers
 */
const { healthCheck } = require('./controllers/healthCheck');
const loginRouter = require('./controllers/login');
const villageRouter = require('./controllers/villages');

/**
 * Adding version
 */
const versioning = app => {
  const router = require('express').Router();
  router.use(authenticate);
  router.use('/villages', villageRouter);
  return router;
};

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/ping', (_, res) => res.send('pong'));
  app.get('/', (req, res) => {
    res.json(listEndpoints(app));
  });
  app.use('/auth', loginRouter);
  app.use('/api/v1', versioning(app));
};

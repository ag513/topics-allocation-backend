'use strict';
/**
 * module dependencies
 */
const listEndpoints = require('express-list-endpoints');

const {authenticate} = require('./middlewares/authenticate');

/**
 * import controllers
 */
const {healthCheck} = require('./controllers/healthCheck');
const loginRouter = require('./controllers/login');
const topicRouter = require('./controllers/topics');
const preferencesRouter = require('./controllers/preferences');
const userRouter = require('./controllers/user');

/**
 * Adding version
 */
const versioning = app => {
  const router = require('express').Router();
  // router.use(authenticate);
  router.use('/topics', topicRouter);
  router.use('/users', userRouter);
  router.use('/preferences', preferencesRouter);
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

'use strict';

const { NODE_ENV } = process.env;

require('dotenv').config();

const app = require('./app.js');
const logger = require('./src/logger');
const { connect } = require('./src/db/connect');

const port = process.env.PORT || 8080;

function listen() {
  if (app.get('env') === 'test') return;
  app.listen(port);
  logger.info('Express app started on port ' + port);
}

async function start() {
  await connect();
  listen();
}

start();

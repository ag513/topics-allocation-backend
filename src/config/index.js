'use strict';

const development = require('./env/development');
const test = require('./env/test');
const production = require('./env/production');

/**
 * Expose
 */

module.exports = {
  development: Object.assign({}, development),
  test: Object.assign({}, test),
  production: Object.assign({}, production)
}[process.env.NODE_ENV || 'development'];

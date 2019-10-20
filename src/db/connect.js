const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../logger');

module.exports = {
  connect: async function() {
    mongoose.connection
      .on('error', console.log)
      .on('disconnected', async () => {
        await this.connect();
      });
    try {
      await mongoose.connect(config.DB_URL, {
        dbName: config.DEFAULT_DB
      });
    } catch (err) {
      logger.error(err.stack);
    }
  }
};

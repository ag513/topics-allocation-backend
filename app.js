const express = require("express"),
  morgan = require("morgan"),
  cors = require("cors"),
  config = require("./src/config"),
  routes = require("./src/app/routes"),
  {errorHandler} = require("./src/app/middlewares/errors"),
  logger = require('./src/logger')
  DEFAULT_BODY_SIZE_LIMIT = 1024 * 1024 * 10,
  DEFAULT_PARAMETER_LIMIT = 10000;

const bodyParserJsonConfig = () => ({
  parameterLimit: config.api.parameterLimit || DEFAULT_PARAMETER_LIMIT,
  limit: config.api.bodySizeLimit || DEFAULT_BODY_SIZE_LIMIT
});

const bodyParserUrlencodedConfig = () => ({
  extended: true,
  parameterLimit: config.api.parameterLimit || DEFAULT_PARAMETER_LIMIT,
  limit: config.api.bodySizeLimit || DEFAULT_BODY_SIZE_LIMIT
});

const app = express();

app.use(cors());

// Client must send "Content-Type: application/json" header
app.use(express.json(bodyParserJsonConfig()));
app.use(express.urlencoded(bodyParserUrlencodedConfig()));

app.use(morgan("combined", { stream: logger.stream }));
routes.init(app);

errorHandler(app);

module.exports = app;

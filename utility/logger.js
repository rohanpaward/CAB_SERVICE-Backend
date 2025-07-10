/**
 * Centralized logger configuration using Bunyan
 * Author: Rohan Pawar
 */

const bunyan = require('bunyan');

// 🔸 Serialize request info for logs
const logRequestSerializer = (req) => ({
  type: 'REQUEST',
  method: req?.method,
  path: req?.path,
  body: req?.body,
  query: req?.query,
});

// 🔸 Setup log output streams
const logStreams = [];

if (process.env.LOG_DETAILS?.includes('file')) {
  logStreams.push({
    type: 'rotating-file',
    path: process.env.LOG_FILE || './logs/app.log',
    period: process.env.LOG_ROTATION_PERIOD || '1d',
    count: 3,
  });
}

if (process.env.LOG_DETAILS?.includes('stdout')) {
  logStreams.push({
    stream: process.stdout,
  });
}

// 🔸 Logger configuration
const loggerConfig = {
  name: process.env.LOGGER_NAME || 'CAB_SERVICE-Logger',
  streams: logStreams,
  serializers: {
    req: logRequestSerializer,
  },
};

// 🔸 Create and export logger
const log = bunyan.createLogger(loggerConfig);
const logger = log.child();

module.exports = {
  logger,
  log,
  logRequestSerializer,
};

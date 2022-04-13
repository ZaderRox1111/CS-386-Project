// This file sets up logging properly
// Will log all useful information when any request is made to the server

const { connectLogger, levels } = require('log4js');
const log4js = require('log4js');
const { Database } = require('../util/dynamo');

const logBody = (req, res) => {
  const log = {
    request: {
      'user-agent': req.headers['user-agent'],
      host: req.headers.host,
      endpoint: req.originalUrl,
      method: req.method,
      params: req.params,
      query: req.query,
      body: req.body
    },
    response: {
      status: res.statusCode,
      statusMessage: res.statusMessage,
      responseTime: res.responseTime,
      'content-type': res.getHeaders()['content-type']
    }
  }

  // Send the log to the database
  if (process.env.ENV !== 'LOCAL') {
    const db = new Database();
    db.accessTable('PUT', JSON.stringify(log, replacer));
  }
  else {
    console.log('Would be accessing database if it wasn\'t ' + process.env.ENV);
  }

  return log;
}

log4js.configure({
  appenders: {
    out: {
      type: 'stdout'
    },
    everything: {
      type: 'dateFile',
      filename: 'logs/CS-386-Project.log',
      daysToKeep: 30
    }
  },
  categories: {
    default: {
      appenders: ['out', 'everything'],
      level: 'debug'
    }
  }
});

const logger = log4js.getLogger();

logger.level = 'info';

const statusRules = [
  { from: 200, to: 299, level: levels.INFO },
  { from: 300, to: 399, level: levels.WARN },
  { from: 400, to: 499, level: levels.ERROR }
];

// Replaces all empty objects with undefined so they don't show on logs
const replacer = (key, value) => {
  if (JSON.stringify(value) === '{}') {
    return undefined;
  }

  return value;
}

const httpLogger = () => {
  return connectLogger(logger, {
    level: 'auto',
    statusRules,
    format: (req, res, format) => format(JSON.stringify(logBody(req, res), replacer, 2))
  });
};

module.exports = {
  httpLogger
}

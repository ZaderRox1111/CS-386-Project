const AWS = require("aws-sdk");
AWS.config.update({region:'us-east-1'});
const logger = require('log4js').getLogger();

class Database {
  constructor() {
    this.profile = 'quikmafs';
    this.tableName = 'cs-386-quikmafs';

    this.setCredentials();
  }

  setCredentials() {
    var credentials = new AWS.SharedIniFileCredentials({profile: 'quikmafs'});

    if (credentials.profile !== this.profile) {
      logger.error('Trouble setting AWS credentials');

      return;
    }

    AWS.config.credentials = credentials;
  }

  async accessTable(method, log) {
    let response;

    try {
      switch (method) {
        case 'GET':
          response = await this.getTable();
          break;
        case 'PUT':
          response = await this.putItem(this.createItem(log));
          break;
        case 'DELETE':
          response = await this.deleteItem(log);
          break;
      }
    } catch (error) {
      response = error;
    } finally {
      return response;
    }
  }

  createItem(log) {
    const dateTime = new Date().toISOString();
    const jsonLog = JSON.stringify(log);

    return {
      time: dateTime,
      log: jsonLog
    }
  }

  async getTable() {
    const dynamo = new AWS.DynamoDB.DocumentClient();

    let response;
    const params = {
      TableName: this.tableName
    };

    await dynamo.scan(params, (err, data) => {
      response = (err ? err : data);
    }).promise();

    return JSON.stringify(response);
  }

  async putItem(item) {
    const dynamo = new AWS.DynamoDB.DocumentClient();

    let response;
    const params = {
      TableName: this.tableName,
      Item: item
    };

    await dynamo.put(params, (err, data) => {
      response = (err ? err : item);
    }).promise();

    return JSON.stringify(response);
  }

  async deleteItem(item) {
    const dynamo = new AWS.DynamoDB.DocumentClient();

    let response;
    const params = {
      TableName: this.tableName,
      Key: {
        time: item.time
      }
    };

    await dynamo.delete(params, (err, data) => {
      response = (err ? err : item);
    }).promise();

    return JSON.stringify(response);
  }
}

module.exports = {
  Database
};

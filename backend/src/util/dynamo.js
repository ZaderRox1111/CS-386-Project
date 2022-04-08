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

  getTable() {
    const dynamo = new AWS.DynamoDB.DocumentClient();

    let response;
    const params = {
      TableName: this.tableName
    };

    dynamo.scan(params, (err, data) => {
      response = (err ? err : data);
    })

    return response;
  }

  async putItem(item) {
    const dynamo = new AWS.DynamoDB.DocumentClient();

    let response;
    const params = {
      TableName: this.tableName,
      Item: item
    };

    await dynamo.put(params, (err, data) => {
      response = (err ? err : data);
    })

    return JSON.stringify(response);
  }

  async deleteItem(item) {
    const dynamo = new AWS.DynamoDB.DocumentClient();

    let response;
    const params = {
      TableName: this.tableName,
      Key: item
    };

    await dynamo.scan(params, (err, data) => {
      response = (err ? err : data);
    })

    return JSON.stringify(response);
  }
}

const main = async () => {
  const db = new Database();
  console.log(await db.getTable());
}

main();
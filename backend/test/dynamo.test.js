var assert = require('assert');

const { Database } = require('../src/util/dynamo');

describe('Testing connection to the database', async () => {
  it('should be able to grab the list of logs on the database', async () => {
    const stringJson = '{"request":{"user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36","host":"104.168.247.236","endpoint":"/server/test","method":"GET"},"response":{"status":200,"statusMessage":"OK","responseTime":8,"content-type":"text/html; charset=utf-8"}}';

    const expected = stringJson;
    let actual = {};

    const db = new Database();
    const dbGet = JSON.parse(await db.accessTable('GET', {}));

    dbGet.Items.forEach(item => {
      if (item.time === 'test') {
        actual = JSON.parse(item.log);
      }
    });

    assert.deepEqual(actual, expected);
  });
});
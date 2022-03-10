const logger = require('log4js').getLogger();

const express = require('express');
const app = express();
const cors = require('cors');
const { httpLogger } = require('./middlewares/logger')
const router = require('./router/router');

let port = 80;
let ip = '104.168.247.236';

app.use(httpLogger());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/server', router);

// Check if it is local and change accordingly
if (process.argv[2] === 'local') {
    port = 8080;
    ip = 'localhost'
}

app.listen(port, () => {
    logger.info(`Listening on port ${port}. Access here: http://${ip}:${port}/server`);
})

const logger = require('log4js').getLogger();

const express = require('express');
const app = express();
const cors = require('cors');
const { httpLogger } = require('./middlewares/logger')
const router = require('./router/router');

const port = 80;
const ip = '104.168.247.236';

app.use(httpLogger());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/server', router);

app.listen(port, () => {
    logger.info(`Listening on port ${port}. Access here: http://${ip}:${port}/server`);
})

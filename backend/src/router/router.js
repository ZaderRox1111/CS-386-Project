const express = require('express');
const app = express();
const router = express.Router();

const matrix = require('./matrix');
const test = require('./test');

router.use('/matrix', matrix);
router.use('/test', test);

module.exports = router;
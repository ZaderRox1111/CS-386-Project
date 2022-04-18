const express = require('express');
const app = express();
const router = express.Router();

const matrix = require('./matrix');
const test = require('./test');
const probability = require('./probability');
const conversion = require('./conversion');

router.use('/matrix', matrix);
router.use('/test', test);
router.use('/probability', probability);
router.use('/conversion', conversion);

module.exports = router;

const express = require('express');
const app = express();
const router = express.Router();

const { exampleGet, examplePost, calculateMatrix } = require('../handlers/matrix');

router.use('/example/get', exampleGet);
router.post('/example/post', examplePost);
router.post('/calculate', calculateMatrix);

module.exports = router;

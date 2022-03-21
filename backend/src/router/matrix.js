const express = require('express');
const app = express();
const router = express.Router();

const { calculateMatrix } = require('../handlers/matrix');

router.post('/calculate', calculateMatrix);

module.exports = router;

const express = require('express');
const app = express();
const router = express.Router();

const { conversion } = require('../handlers/conversion');

router.post('/', conversion);

module.exports = router;

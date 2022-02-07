const express = require('express');
const app = express();
const router = express.Router();

const { exampleGet, examplePost } = require('../handlers/matrix');

router.use('/example/get', exampleGet);
router.post('/example/post', examplePost);

module.exports = router;

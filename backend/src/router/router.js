const express = require('express');
const app = express();
const router = express.Router();
const example = require('./example');

router.use('/example', example);
router.use('/test', (req, res) => {
    res.send('test');
});

module.exports = router;
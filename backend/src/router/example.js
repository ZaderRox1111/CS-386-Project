const express = require('express');
const app = express();
const router = express.Router();

router.use('/', (req, res) => {
    res.send('example');
})

module.exports = router;

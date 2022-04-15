const express = require('express');
const app = express();
const router = express.Router();

const { calculatePnr, calculateCnr, calculateUnion, calculateIntersect } = require('../handlers/probability');

router.post('/pnr', calculatePnr);
router.post('/cnr', calculateCnr);
router.post('/union', calculateUnion);
router.post('/intersect', calculateIntersect);

module.exports = router;

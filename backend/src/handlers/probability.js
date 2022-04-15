const {P, C, union, intersect} = require('../util/probability');

const calculatePnr = (req, res) => {
  const body = req.body;

  const result = P(body.n, body.r);

  res.status(200).send(result + '');
}

const calculateCnr = (req, res) => {
  const body = req.body;
  
  const result = C(body.n, body.r);

  res.status(200).send(result + '');
}

const calculateUnion = (req, res) => {
  const body = req.body;
  
  const result = union(body.probA, body.probB);

  res.status(200).send(result + '');
}

const calculateIntersect = (req, res) => {
  const body = req.body;
  
  const result = intersect(body.probA, body.probB);

  res.status(200).send(result + '');
}

module.exports = {
  calculatePnr,
  calculateCnr,
  calculateUnion,
  calculateIntersect
}

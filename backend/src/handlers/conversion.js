const {Conversion} = require('../util/conversion');

const conversion = (req, res) => {
  const body = req.body;

  const conv = new Conversion(body.category, body.convertTo, body.convertFrom, parseFloat(body.value));
  const result = conv.convert();

  res.status(200).send(result + '');
}

module.exports = {
  conversion
}

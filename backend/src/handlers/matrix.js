// Handlers folder will handle requests. Put utility stuff like calculations/etc in util

const { getRandomNumber } = require('../util/matrix');

// Example of a JavaScript function that takes a request (req) and sends back a res with data
// You can do anything you want in between, you just need to send a response (res) back
const exampleGet = (req, res) => {
  const randomNum = getRandomNumber();

  res.status(200).send(`Example get request on the matrix calculator. Random number: ${randomNum}`)
}

// Post requests have bodies on them with info we can extract
// To get the info, just use req.body
const examplePost = (req, res) => {
  const body = req.body;

  res.status(200).send(`Request body: ${body}`);
}

module.exports = {
  exampleGet,
  examplePost
}

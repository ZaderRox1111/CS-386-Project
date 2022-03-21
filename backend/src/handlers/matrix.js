// Handlers folder will handle requests. Put utility stuff like calculations/etc in util

const { RealMatrix, realMatrixFromJSON } = require('../util/matrix');

// ===========================================
// Examples
// ===========================================

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

// ===========================================
// Legit functions
// ===========================================

const make2DArray1D = array2D => {
  let newArray = [];
  let index = 0;
  
  for (let outIndex = 0; outIndex < array2D.length; outIndex++) {
    for (let inIndex = 0; inIndex < array2D[outIndex].length; inIndex++) {
      newArray[index] = array2D[outIndex][inIndex];
      index++;
    }
  }

  return newArray;
}

const calculateRref = matrix => {
  // matrix returned by realMatrix is a RealMatrix object
  let rref = matrix.rref();

  rref.matrix = make2DArray1D(rref.matrix);

  return rref;
}

// Calculate
const calculateMatrix = (req, res) => {
  // Body received will resemble '{rows:3,cols:3,entries:[0,0,0,0,0,0,0,0,0]}'
  //const body = JSON.parse(req.body);
  const body = req.body;

  const rrefMatrix = calculateRref(realMatrixFromJSON(body));

  res.status(200).send(JSON.stringify(rrefMatrix));
}

module.exports = {
  calculateMatrix
}

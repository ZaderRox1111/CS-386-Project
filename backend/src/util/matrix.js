// Util holds calculations/work/classes/etc that things in handlers need

// Returns random number between 0 and 100
const getRandomNumber = () => {
  return (Math.random() * 100);
}

module.exports = {
  getRandomNumber
}

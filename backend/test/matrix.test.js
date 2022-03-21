var assert = require('assert');

const { calculateRref, make2DArray1D } = require('../src/handlers/matrix');
const { RealMatrix, realMatrixFromJSON } = require('../src/util/matrix');

describe('Testing handlers/matrix', () => {
  it('should return a zero matrix', () => {
    const expected = [0, 0, 0, 0];

    const actual = calculateRref(new RealMatrix(2, 2)).matrix;

    assert.deepEqual(actual, expected);
  });

  it('should return proper rref for one value', () => {
    const json = {
      rows: '2',
      cols: '2',
      entries: '[0, 0, 1, 0]'
    };

    const expected = [1, 0, 0, 0];

    const actual = calculateRref(realMatrixFromJSON(json)).matrix;

    assert.deepEqual(actual, expected);
  });
});
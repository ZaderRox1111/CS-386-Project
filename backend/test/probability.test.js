var assert = require('assert');

const { P, C, union, intersect } = require('../src/util/probability');

describe('Testing probability', () => {
  it('should return correct answer for Pnr', () => {
    const expected = 604800;

    const actual = P(10, 7);

    assert.equal(actual, expected);
  });

  it('should return correct answer for Cnr', () => {
    const expected = 120;

    const actual = C(10, 7);

    assert.equal(actual, expected);
  });

  it('should return correct answer for intersection', () => {
    const expected = 1/26;

    const actual = intersect(26/52, 4/52);

    assert.equal(actual, expected);
  });

  it('should return correct answer for union', () => {
    const expected = 4/13;

    const actual = union(1/4, 1/13);

    assert.equal(actual, expected);
  });
});
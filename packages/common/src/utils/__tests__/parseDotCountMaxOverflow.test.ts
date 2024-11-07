import { MAX_OVERFLOW_COUNT, parseDotCountMaxOverflow } from '../parseDotCountMaxOverflow';

describe('parseDotCountMaxOverflow', () => {
  it(`9 < ${MAX_OVERFLOW_COUNT} should return 9`, () => {
    expect(parseDotCountMaxOverflow(9)).toBe(9);
  });

  it(`99 == ${MAX_OVERFLOW_COUNT} should equal 99`, () => {
    expect(parseDotCountMaxOverflow(99)).toBe(99);
  });

  it(`102 > ${MAX_OVERFLOW_COUNT} should equal 99+`, () => {
    expect(parseDotCountMaxOverflow(102)).toBe('99+');
  });

  it(`11 > passed max value should equal to {max passed value}+`, () => {
    expect(parseDotCountMaxOverflow(11, 9)).toBe('9+');
  });
});

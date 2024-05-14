import { soundex } from './soundex';

describe('Soundex algorithm', () => {
  it('converts single letters with padding zeros', () => {
    expect(soundex('A')).toEqual('A000');
    expect(soundex('I')).toEqual('I000');
  });

  it('handles letters followed by non-alphabetical characters', () => {
    expect(soundex('Ax')).toEqual('A200');
    expect(soundex('A#')).toEqual('A000');
  });

  it('maps multiple letters correctly', () => {
    expect(soundex('Acdl')).toEqual('A234');
  })

  it("ignores vowels", () => {
    expect(soundex('BaAeEiIoOuUhHyYcdl')).toEqual('B234');
  })

  it("does stuff", () => {
    expect(soundex('Abfcgdt')).toEqual('A123');
  });

  it("does stuff", () => {
    expect(soundex('Bbcd')).toEqual('B230');
  });
});

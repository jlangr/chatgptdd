import fizzBuzz from './fizzBuzz';

describe('FizzBuzz Function Test', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should print the correct values for the first 15 numbers', () => {
    fizzBuzz();
    expect(console.log.mock.calls[0][0]).toBe(1);
    expect(console.log.mock.calls[1][0]).toBe(2);
    expect(console.log.mock.calls[2][0]).toBe('Fizz');
    expect(console.log.mock.calls[3][0]).toBe(4);
    expect(console.log.mock.calls[4][0]).toBe('Buzz');
    expect(console.log.mock.calls[5][0]).toBe('Fizz');
    expect(console.log.mock.calls[6][0]).toBe(7);
    expect(console.log.mock.calls[7][0]).toBe(8);
    expect(console.log.mock.calls[8][0]).toBe('Fizz');
    expect(console.log.mock.calls[9][0]).toBe('Buzz');
    expect(console.log.mock.calls[10][0]).toBe(11);
    expect(console.log.mock.calls[11][0]).toBe('Fizz');
    expect(console.log.mock.calls[12][0]).toBe(13);
    expect(console.log.mock.calls[13][0]).toBe(14);
    expect(console.log.mock.calls[14][0]).toBe('FizzBuzz');
  });
});

// soundex.js
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeNonInitialVowelsAndSpecifics(string) {
  return string.charAt(0) + string.slice(1).replace(/[aeiouyhw]/gi, '');
}

function replaceConsonantsWithNumbers(string) {
  const firstChar = string.charAt(0);
  let previousNumber = mapCharToNumber(firstChar);
  let result = firstChar;

  for (let i = 1; i < string.length; i++) {
    const currentNumber = mapCharToNumber(string[i]);
    if (currentNumber !== previousNumber) {
      result += currentNumber;
      previousNumber = currentNumber;
    }
  }

  return result;
}

function mapCharToNumber(char) {
  switch (char.toLowerCase()) {
    case 'b': case 'f': case 'p': case 'v':
      return '1';
    case 'c': case 'g': case 'j': case 'k': case 'q': case 's': case 'x': case 'z':
      return '2';
    case 'd': case 't':
      return '3';
    case 'l':
      return '4';
    case 'm': case 'n':
      return '5';
    case 'r':
      return '6';
    default:
      return '';  // Ignore non-mapped characters (like vowels after the first character)
  }
}

function formatSoundex(string) {
  const output = string.charAt(0) + string.slice(1).replace(/[^0-9]/g, '');
  return output.padEnd(4, '0').substring(0, 4);
}

function soundex(input) {
  const step1 = capitalizeFirstLetter(input);
  const step2 = removeNonInitialVowelsAndSpecifics(step1);
  const step3 = replaceConsonantsWithNumbers(step2);
  return formatSoundex(step3);
}

export { soundex };
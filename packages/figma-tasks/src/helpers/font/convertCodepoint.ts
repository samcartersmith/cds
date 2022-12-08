/** Convert the hexadecimal string (i.e. '0E966') into a decimal number (i.e. 59,222) */
function hexadecimalToDecimal(hexadecimal: string) {
  /**
   * The "16" specifies that the number being converted is in base 16 (hexadecimal),
   * and that the result should be expressed in base 10 (decimal). *
   */
  return parseInt(hexadecimal, 16);
}

/** Convert a decimal number into a string that represents the character associated with that code point */
function decimalToStringCharacter(decimal: number) {
  return String.fromCodePoint(decimal);
}

/** Convert a string character into a decimal number */
function stringCharacterToDecimal(str: string) {
  const decimal = str.codePointAt(0);
  if (!decimal) {
    throw new Error(`Unable to convert ${str} to a decimal number`);
  }
  return decimal;
}

/** Convert the decimal number (i.e. 59,222) into a hexadecimal string (i.e. '0E966') */
function decimalToHexadecimal(decimal: number) {
  return Number(decimal).toString(16).toUpperCase();
}

function stringCharacterToHexadecimal(str: string) {
  const decimal = stringCharacterToDecimal(str);
  return decimalToHexadecimal(decimal);
}

function hexadecimalToUnicodeHexadecimal(hexadecimal: string) {
  return `u${hexadecimal}`;
}

function unicodeHexadecimalToStringCharacter(unicodeHexadeimcal: string) {
  const hexadecimal = unicodeHexadeimcal.replace('u', '');
  const decimal = hexadecimalToDecimal(hexadecimal);
  return decimalToStringCharacter(decimal);
}

export const convertCodepoint = {
  decimalToHexadecimal,
  hexadecimalToDecimal,
  hexadecimalToUnicodeHexadecimal,
  unicodeHexadecimalToStringCharacter,
  decimalToStringCharacter,
  stringCharacterToDecimal,
  stringCharacterToHexadecimal,
};

export function extractDigits(inputString: string): string {
  const digitRegex = /\d/g;
  const digitsArray = inputString.match(digitRegex);

  if (digitsArray) {
    return digitsArray.join('');
  } else {
    return '';
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

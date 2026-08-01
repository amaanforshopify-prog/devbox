import type { PasswordOptions } from '../types';

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
} as const;

function getRandomChar(charset: string): string {
  if (!charset || charset.length === 0) {
    throw new Error('Charset cannot be empty');
  }

  const randomBytes = new Uint8Array(1);
  const maxValid = 256 - (256 % charset.length);
  let byte: number;

  do {
    window.crypto.getRandomValues(randomBytes);
    byte = randomBytes[0];
  } while (byte >= maxValid);

  return charset[byte % charset.length];
}

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  if (result.length <= 1) return result;

  const randomBytes = new Uint8Array(result.length);
  window.crypto.getRandomValues(randomBytes);

  for (let i = result.length - 1; i > 0; i--) {
    const j = randomBytes[i] % (i + 1);
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }

  return result;
}

export function generatePassword(options: PasswordOptions): string {
  const { length, uppercase, lowercase, numbers, symbols } = options;

  let combinedCharset = '';
  const guaranteedChars: string[] = [];

  if (uppercase) {
    combinedCharset += CHARSETS.uppercase;
    guaranteedChars.push(getRandomChar(CHARSETS.uppercase));
  }
  if (lowercase) {
    combinedCharset += CHARSETS.lowercase;
    guaranteedChars.push(getRandomChar(CHARSETS.lowercase));
  }
  if (numbers) {
    combinedCharset += CHARSETS.numbers;
    guaranteedChars.push(getRandomChar(CHARSETS.numbers));
  }
  if (symbols) {
    combinedCharset += CHARSETS.symbols;
    guaranteedChars.push(getRandomChar(CHARSETS.symbols));
  }

  if (!combinedCharset) {
    throw new Error('At least one character set must be selected');
  }

  const targetLength = Math.max(4, Math.min(64, Math.floor(length)));
  const finalGuaranteed = guaranteedChars.slice(0, targetLength);
  const remainingCount = targetLength - finalGuaranteed.length;

  const passwordChars: string[] = [...finalGuaranteed];
  for (let i = 0; i < remainingCount; i++) {
    passwordChars.push(getRandomChar(combinedCharset));
  }

  return shuffleArray(passwordChars).join('');
}

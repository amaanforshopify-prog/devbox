import type { ValidationResult } from '../types';

export function validateUUID(input: string): ValidationResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      isValid: false,
      version: null,
      error: 'Please enter a UUID to validate',
    };
  }

  const hyphenatedRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  const rawRegex = /^[0-9a-fA-F]{12}[1-8][0-9a-fA-F]{3}[89abAB][0-9a-fA-F]{15}$/;

  const isHyphenated = hyphenatedRegex.test(trimmed);
  const isRaw = rawRegex.test(trimmed);

  if (!isHyphenated && !isRaw) {
    return {
      isValid: false,
      version: null,
      error: 'Invalid UUID format (expected xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)',
    };
  }

  const clean = trimmed.replace(/-/g, '');
  const versionDigit = clean.charAt(12);

  return {
    isValid: true,
    version: `v${versionDigit}`,
  };
}

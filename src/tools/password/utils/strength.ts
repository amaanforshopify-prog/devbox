import type { StrengthResult, StrengthLevel } from '../types';

export function calculateStrength(password: string): StrengthResult {
  if (!password) {
    return {
      score: 0,
      level: 'Weak',
      entropy: 0,
      feedback: ['Generate a password to check its strength'],
      color: 'bg-red-500 text-red-500',
    };
  }

  const length = password.length;
  let poolSize = 0;

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^A-Za-z0-9]/.test(password);

  if (hasUppercase) poolSize += 26;
  if (hasLowercase) poolSize += 26;
  if (hasNumbers) poolSize += 10;
  if (hasSymbols) poolSize += 32;

  const entropy = poolSize > 0 ? Math.round(length * Math.log2(poolSize)) : 0;
  
  // Normalized score 0-100 based on 90 bits max target
  const score = Math.min(100, Math.max(0, Math.round((entropy / 90) * 100)));

  let level: StrengthLevel;
  let color: string;

  if (entropy < 28 || length < 8) {
    level = 'Weak';
    color = 'bg-red-500 text-red-500';
  } else if (entropy < 50 || length < 12) {
    level = 'Medium';
    color = 'bg-amber-500 text-amber-500';
  } else if (entropy < 75) {
    level = 'Strong';
    color = 'bg-blue-500 text-blue-500';
  } else {
    level = 'Very Strong';
    color = 'bg-emerald-500 text-emerald-500';
  }

  const feedback: string[] = [];
  if (length < 12) {
    feedback.push('Increase length to 12+ characters for better security');
  }
  if (!hasUppercase) {
    feedback.push('Add uppercase letters (A-Z)');
  }
  if (!hasLowercase) {
    feedback.push('Add lowercase letters (a-z)');
  }
  if (!hasNumbers) {
    feedback.push('Add numbers (0-9)');
  }
  if (!hasSymbols) {
    feedback.push('Add symbols (!@#$)');
  }
  if (feedback.length === 0) {
    feedback.push('Excellent password strength and character variety');
  }

  return {
    score,
    level,
    entropy,
    feedback,
    color,
  };
}

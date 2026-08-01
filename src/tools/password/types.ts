export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export type StrengthLevel = 'Weak' | 'Medium' | 'Strong' | 'Very Strong';

export interface StrengthResult {
  score: number;
  level: StrengthLevel;
  entropy: number;
  feedback: string[];
  color: string;
}

export interface PasswordState {
  password: string;
  options: PasswordOptions;
  strength: StrengthResult;
  isProcessing: boolean;
  error: string | null;
}

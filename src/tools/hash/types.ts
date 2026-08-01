export type HashAlgorithm = 'SHA-256' | 'SHA-384' | 'SHA-512' | 'SHA-1';

export type SecurityLevel = 'secure' | 'legacy' | 'insecure';

export interface AlgorithmInfo {
  id: HashAlgorithm;
  name: string;
  bitLength: number;
  hexLength: number;
  security: SecurityLevel;
  description: string;
}

export interface HashState {
  input: string;
  algorithm: HashAlgorithm;
  output: string;
  uppercase: boolean;
  isProcessing: boolean;
  error: string | null;
}

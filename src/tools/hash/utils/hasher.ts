import type { HashAlgorithm, AlgorithmInfo } from '../types';

export const ALGORITHMS: Record<HashAlgorithm, AlgorithmInfo> = {
  'SHA-256': {
    id: 'SHA-256',
    name: 'SHA-256',
    bitLength: 256,
    hexLength: 64,
    security: 'secure',
    description: 'Standard 256-bit cryptographic hash function (Recommended)',
  },
  'SHA-384': {
    id: 'SHA-384',
    name: 'SHA-384',
    bitLength: 384,
    hexLength: 96,
    security: 'secure',
    description: '384-bit hash function from the SHA-2 family',
  },
  'SHA-512': {
    id: 'SHA-512',
    name: 'SHA-512',
    bitLength: 512,
    hexLength: 128,
    security: 'secure',
    description: '512-bit hash function providing maximum collision resistance',
  },
  'SHA-1': {
    id: 'SHA-1',
    name: 'SHA-1',
    bitLength: 160,
    hexLength: 40,
    security: 'legacy',
    description: '160-bit hash function (Legacy / Cryptographically Deprecated)',
  },
};

export async function generateHash(text: string, algorithm: HashAlgorithm): Promise<string> {
  if (!text) {
    return '';
  }

  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch (err) {
    throw new Error(`Failed to generate ${algorithm} hash: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}

function normalizeBase64(str: string): string {
  let base64 = str.trim().replace(/-/g, '+').replace(/_/g, '/');
  const mod = base64.length % 4;
  if (mod === 2) {
    base64 += '==';
  } else if (mod === 3) {
    base64 += '=';
  }
  return base64;
}

export function decodeBase64(encoded: string): string {
  const trimmed = encoded.trim();
  if (!trimmed) {
    return '';
  }

  const normalized = normalizeBase64(trimmed);

  try {
    const binaryString = atob(normalized);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    try {
      return atob(normalized);
    } catch {
      throw new Error('Invalid Base64 input - unable to decode');
    }
  }
}

export function decodeUrlSafeBase64(encoded: string): string {
  return decodeBase64(encoded);
}

export function isValidBase64(encoded: string): boolean {
  if (!encoded.trim()) {
    return true;
  }
  try {
    decodeBase64(encoded);
    return true;
  } catch {
    return false;
  }
}
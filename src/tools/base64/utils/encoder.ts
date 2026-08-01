function uint8ArrayToBase64(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  const chunkSize = 0x8000;
  for (let i = 0; i < len; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, Array.from(chunk));
  }
  return btoa(binary);
}

export function encodeBase64(text: string): string {
  try {
    const utf8Bytes = new TextEncoder().encode(text);
    return uint8ArrayToBase64(utf8Bytes);
  } catch {
    throw new Error('Failed to encode text to Base64');
  }
}

export function encodeUrlSafeBase64(text: string): string {
  try {
    const base64 = encodeBase64(text);
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch {
    throw new Error('Failed to encode text to URL-safe Base64');
  }
}
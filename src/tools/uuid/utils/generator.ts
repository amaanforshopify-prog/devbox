export function generateUUIDv4(uppercase = false, hyphens = true): string {
  let uuid: string;

  if (typeof window !== 'undefined' && window.crypto && typeof window.crypto.randomUUID === 'function') {
    uuid = window.crypto.randomUUID();
  } else {
    const bytes = new Uint8Array(16);
    window.crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // Version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variant 10xx

    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
    uuid = `${hex.substring(0, 8)}-${hex.substring(8, 12)}-${hex.substring(12, 16)}-${hex.substring(16, 20)}-${hex.substring(20, 32)}`;
  }

  if (!hyphens) {
    uuid = uuid.replace(/-/g, '');
  }

  if (uppercase) {
    uuid = uuid.toUpperCase();
  }

  return uuid;
}

export function generateUUIDs(quantity: number, uppercase = false, hyphens = true): string[] {
  const count = Math.max(1, Math.min(100, Math.floor(quantity)));
  const results: string[] = [];

  for (let i = 0; i < count; i++) {
    results.push(generateUUIDv4(uppercase, hyphens));
  }

  return results;
}

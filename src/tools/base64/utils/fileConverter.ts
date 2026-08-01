export function getMimeType(file: File): string {
  return file.type || 'application/octet-stream';
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB safety limit
    if (file.size > MAX_FILE_SIZE) {
      reject(new Error(`File size exceeds maximum limit of ${formatFileSize(MAX_FILE_SIZE)}`));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      const commaIndex = result.indexOf(',');
      if (commaIndex !== -1) {
        resolve(result.substring(commaIndex + 1));
      } else {
        resolve(result);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file contents'));
    };

    reader.readAsDataURL(file);
  });
}
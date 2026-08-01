export interface FileInfo {
  name: string;
  size: number;
  mimeType: string;
}

export interface Base64State {
  input: string;
  output: string;
  fileInfo: FileInfo | null;
  isProcessing: boolean;
  error: string | null;
}
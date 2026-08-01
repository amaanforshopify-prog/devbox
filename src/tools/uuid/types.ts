export interface UUIDOptions {
  quantity: number;
  uppercase: boolean;
  hyphens: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  version: string | null;
  error?: string;
}

export interface HistoryItem {
  id: string;
  uuid: string;
  timestamp: number;
}

export interface UUIDState {
  uuids: string[];
  options: UUIDOptions;
  history: HistoryItem[];
  validationInput: string;
  validationResult: ValidationResult | null;
  isProcessing: boolean;
  error: string | null;
}

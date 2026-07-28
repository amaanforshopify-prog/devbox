export interface ValidationResult {
  isValid: boolean;
  error?: {
    message: string;
    line: number;
    column: number;
  };
}

export interface JsonFormatterState {
  input: string;
  output: string;
  validationResult: ValidationResult;
  isProcessing: boolean;
}
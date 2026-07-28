import type { ValidationResult } from '../types';

export function validateJson(jsonString: string): ValidationResult {
  try {
    JSON.parse(jsonString);
    return { isValid: true };
  } catch (error) {
    if (error instanceof SyntaxError) {
      const errorMatch = error.message.match(/position (\d+)/);
      const position = errorMatch ? parseInt(errorMatch[1], 10) : 0;
      
      const lines = jsonString.substring(0, position).split('\n');
      const line = lines.length;
      const column = lines[lines.length - 1].length + 1;
      
      return {
        isValid: false,
        error: {
          message: error.message,
          line,
          column,
        },
      };
    }
    
    return {
      isValid: false,
      error: {
        message: 'Unknown error',
        line: 0,
        column: 0,
      },
    };
  }
}
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ValidationResult } from '../types';

interface ValidationStatusProps {
  validationResult: ValidationResult;
  className?: string;
}

export function ValidationStatus({ validationResult, className }: ValidationStatusProps) {
  if (validationResult.isValid) {
    return (
      <div className={cn('flex items-center gap-2 text-sm text-green-500', className)}>
        <CheckCircle className="h-4 w-4" />
        <span>Valid JSON</span>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2 text-sm text-red-500', className)}>
      <XCircle className="h-4 w-4" />
      <div className="flex flex-col">
        <span>Invalid JSON</span>
        {validationResult.error && (
          <span className="text-xs">
            Line {validationResult.error.line}, Column {validationResult.error.column}: {validationResult.error.message}
          </span>
        )}
      </div>
    </div>
  );
}
import { Hash, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { UUIDOptions, ValidationResult } from '../types';

interface UUIDControlsProps {
  options: UUIDOptions;
  onQuantityChange: (qty: number) => void;
  onUppercaseChange: (uppercase: boolean) => void;
  onHyphensChange: (hyphens: boolean) => void;
  onGenerate: () => void;
  validationInput: string;
  onValidationInputChange: (input: string) => void;
  validationResult: ValidationResult | null;
  isProcessing?: boolean;
  className?: string;
}

export function UUIDControls({
  options,
  onQuantityChange,
  onUppercaseChange,
  onHyphensChange,
  onGenerate,
  validationInput,
  onValidationInputChange,
  validationResult,
  isProcessing = false,
  className,
}: UUIDControlsProps) {
  const presetQuantities = [1, 5, 10, 50];

  return (
    <div className={cn('space-y-6', className)}>
      {/* Quantity & Options selection */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Quantity to Generate</label>
          <div className="flex flex-wrap items-center gap-2">
            {presetQuantities.map((qty) => (
              <Button
                key={qty}
                type="button"
                variant={options.quantity === qty ? 'default' : 'outline'}
                size="sm"
                onClick={() => onQuantityChange(qty)}
                className="h-8 px-3 text-xs font-mono"
              >
                {qty} {qty === 1 ? 'UUID' : 'UUIDs'}
              </Button>
            ))}

            <div className="flex items-center gap-1.5 ml-auto">
              <span className="text-xs text-muted-foreground">Custom:</span>
              <input
                type="number"
                min={1}
                max={100}
                value={options.quantity}
                onChange={(e) => onQuantityChange(parseInt(e.target.value, 10) || 1)}
                className="w-16 rounded-md border border-input bg-background px-2 py-1 text-right text-xs font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
        </div>

        {/* Format toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label
            className={cn(
              'flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors',
              options.uppercase
                ? 'border-primary/50 bg-primary/5'
                : 'border-border bg-card hover:bg-accent/50'
            )}
          >
            <div className="space-y-0.5">
              <span className="text-sm font-medium">Uppercase</span>
              <p className="text-xs text-muted-foreground">e.g. 550E8400-E29B...</p>
            </div>
            <input
              type="checkbox"
              checked={options.uppercase}
              onChange={(e) => onUppercaseChange(e.target.checked)}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary accent-primary"
            />
          </label>

          <label
            className={cn(
              'flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors',
              options.hyphens
                ? 'border-primary/50 bg-primary/5'
                : 'border-border bg-card hover:bg-accent/50'
            )}
          >
            <div className="space-y-0.5">
              <span className="text-sm font-medium">Hyphens</span>
              <p className="text-xs text-muted-foreground">Include standard separators (-)</p>
            </div>
            <input
              type="checkbox"
              checked={options.hyphens}
              onChange={(e) => onHyphensChange(e.target.checked)}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary accent-primary"
            />
          </label>
        </div>

        {/* Generate Button */}
        <Button
          type="button"
          onClick={onGenerate}
          disabled={isProcessing}
          variant="default"
          size="lg"
          className="w-full font-semibold shadow"
        >
          <Hash className="h-5 w-5 mr-2" />
          Generate UUIDs
        </Button>
      </div>

      {/* UUID Live Validator */}
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <label className="text-sm font-semibold flex items-center justify-between">
          <span>UUID Format Validator</span>
          {validationResult && (
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
                validationResult.isValid
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  : 'bg-destructive/15 text-destructive'
              )}
            >
              {validationResult.isValid ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Valid ({validationResult.version})
                </>
              ) : (
                <>
                  <AlertCircle className="h-3.5 w-3.5" />
                  Invalid
                </>
              )}
            </span>
          )}
        </label>

        <input
          type="text"
          value={validationInput}
          onChange={(e) => onValidationInputChange(e.target.value)}
          placeholder="Paste a UUID to validate format (e.g. 123e4567-e89b-12d3-a456-426614174000)"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />

        {validationResult && !validationResult.isValid && validationResult.error && (
          <p className="text-xs text-destructive">{validationResult.error}</p>
        )}
      </div>
    </div>
  );
}

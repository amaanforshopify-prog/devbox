import { Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PasswordOptions } from '../types';

interface PasswordControlsProps {
  options: PasswordOptions;
  onLengthChange: (length: number) => void;
  onToggleOption: (optionKey: keyof Omit<PasswordOptions, 'length'>) => void;
  onGenerate: () => void;
  isProcessing?: boolean;
  className?: string;
}

export function PasswordControls({
  options,
  onLengthChange,
  onToggleOption,
  onGenerate,
  isProcessing = false,
  className,
}: PasswordControlsProps) {
  const quickLengths = [8, 12, 16, 24, 32, 64];

  const characterTypes: Array<{
    key: keyof Omit<PasswordOptions, 'length'>;
    label: string;
    description: string;
    sample: string;
  }> = [
    {
      key: 'uppercase',
      label: 'Uppercase Letters',
      description: 'Include A-Z characters',
      sample: 'ABC',
    },
    {
      key: 'lowercase',
      label: 'Lowercase Letters',
      description: 'Include a-z characters',
      sample: 'abc',
    },
    {
      key: 'numbers',
      label: 'Numbers',
      description: 'Include 0-9 digits',
      sample: '123',
    },
    {
      key: 'symbols',
      label: 'Symbols',
      description: 'Include !@#$%^&* symbols',
      sample: '!@#',
    },
  ];

  return (
    <div className={cn('space-y-6', className)}>
      {/* Length control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Password Length</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={4}
              max={64}
              value={options.length}
              onChange={(e) => onLengthChange(parseInt(e.target.value, 10) || 4)}
              className="w-16 rounded-md border border-input bg-background px-2 py-1 text-right text-sm font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <span className="text-xs text-muted-foreground">chars</span>
          </div>
        </div>

        <input
          type="range"
          min={4}
          max={64}
          value={options.length}
          onChange={(e) => onLengthChange(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
        />

        {/* Quick preset buttons */}
        <div className="flex flex-wrap gap-2 pt-1">
          {quickLengths.map((len) => (
            <Button
              key={len}
              type="button"
              variant={options.length === len ? 'default' : 'outline'}
              size="sm"
              onClick={() => onLengthChange(len)}
              className="h-7 px-2.5 text-xs font-mono"
            >
              {len}
            </Button>
          ))}
        </div>
      </div>

      {/* Character Toggles */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Character Sets</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {characterTypes.map((item) => {
            const isChecked = options[item.key];
            return (
              <label
                key={item.key}
                className={cn(
                  'flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors',
                  isChecked
                    ? 'border-primary/50 bg-primary/5'
                    : 'border-border bg-card hover:bg-accent/50'
                )}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="font-mono text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      {item.sample}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleOption(item.key)}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-primary accent-primary"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Generate Action Button */}
      <Button
        type="button"
        onClick={onGenerate}
        disabled={isProcessing}
        variant="default"
        size="lg"
        className="w-full font-semibold shadow"
      >
        <Key className="h-5 w-5 mr-2" />
        Generate Password
      </Button>
    </div>
  );
}

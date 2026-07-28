import { cn } from '@/lib/utils';

interface JsonOutputProps {
  value: string;
  className?: string;
}

export function JsonOutput({ value, className }: JsonOutputProps) {
  return (
    <textarea
      value={value}
      readOnly
      className={cn(
        'flex h-full w-full resize-none rounded-md border border-input bg-muted px-3 py-2 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 font-mono',
        className
      )}
    />
  );
}
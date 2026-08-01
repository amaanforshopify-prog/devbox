import { cn } from '@/lib/utils';

interface Base64OutputProps {
  value: string;
  placeholder?: string;
  className?: string;
}

export function Base64Output({
  value,
  placeholder = 'Result will appear here...',
  className,
}: Base64OutputProps) {
  return (
    <textarea
      value={value}
      readOnly
      placeholder={placeholder}
      className={cn(
        'flex h-full w-full resize-none rounded-md border border-input bg-muted px-3 py-2 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 font-mono',
        className
      )}
    />
  );
}
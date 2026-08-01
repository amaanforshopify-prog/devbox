import { type ChangeEvent } from 'react';
import { cn } from '@/lib/utils';

interface Base64EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

export function Base64Editor({
  value,
  onChange,
  placeholder = 'Enter text to encode or Base64 string to decode...',
  readOnly = false,
  className,
}: Base64EditorProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className={cn(
        'flex h-full w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono',
        className
      )}
    />
  );
}
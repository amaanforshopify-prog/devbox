import { useState } from 'react';
import { Copy, RefreshCw, Eye, EyeOff, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PasswordEditorProps {
  password: string;
  onCopy: () => void;
  onRegenerate: () => void;
  onClear: () => void;
  isProcessing?: boolean;
  className?: string;
}

export function PasswordEditor({
  password,
  onCopy,
  onRegenerate,
  onClear,
  isProcessing = false,
  className,
}: PasswordEditorProps) {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <div className={cn('space-y-3', className)}>
      <div className="relative flex items-center">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          readOnly
          placeholder="Generated password will appear here..."
          className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-lg font-semibold tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pr-36"
        />
        <div className="absolute right-2 flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={!password}
            title={showPassword ? 'Hide password' : 'Show password'}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRegenerate}
            disabled={isProcessing}
            title="Regenerate password"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className={cn('h-4 w-4', isProcessing && 'animate-spin')} />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onCopy}
            disabled={!password}
            title="Copy password"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <Copy className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClear}
            disabled={!password}
            title="Clear password"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

import { History, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { HistoryItem } from '../types';

interface UUIDHistoryProps {
  history: HistoryItem[];
  onCopyOne: (uuid: string) => void;
  onClearHistory: () => void;
  className?: string;
}

export function UUIDHistory({
  history,
  onCopyOne,
  onClearHistory,
  className,
}: UUIDHistoryProps) {
  const hasHistory = history.length > 0;

  const formatTime = (ts: number) => {
    try {
      return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className={cn('space-y-3 rounded-lg border border-border bg-card p-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold">Generation History</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground">
            {history.length}
          </span>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClearHistory}
          disabled={!hasHistory}
          className="h-7 text-xs text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5 mr-1" />
          Clear History
        </Button>
      </div>

      {!hasHistory ? (
        <p className="text-xs text-muted-foreground py-2 text-center">
          No history recorded yet. Generated UUIDs will be stored locally.
        </p>
      ) : (
        <div className="max-h-[200px] overflow-y-auto space-y-1.5 pr-1">
          {history.map((item) => (
            <div
              key={item.id}
              className="group flex items-center justify-between rounded-md bg-muted/40 px-2.5 py-1.5 font-mono text-xs hover:bg-muted"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] text-muted-foreground shrink-0">{formatTime(item.timestamp)}</span>
                <span className="font-medium truncate">{item.uuid}</span>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onCopyOne(item.uuid)}
                title="Copy UUID"
                className="h-6 w-6 text-muted-foreground hover:text-foreground opacity-80 group-hover:opacity-100 shrink-0"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

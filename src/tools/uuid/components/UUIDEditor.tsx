import { Copy, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UUIDEditorProps {
  uuids: string[];
  onCopyOne: (uuid: string) => void;
  onCopyAll: () => void;
  onDownload: () => void;
  onClear: () => void;
  className?: string;
}

export function UUIDEditor({
  uuids,
  onCopyOne,
  onCopyAll,
  onDownload,
  onClear,
  className,
}: UUIDEditorProps) {
  const hasUUIDs = uuids.length > 0;

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Generated UUIDs</span>
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-mono font-semibold">
            {uuids.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCopyAll}
            disabled={!hasUUIDs}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy All
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onDownload}
            disabled={!hasUUIDs}
          >
            <Download className="h-4 w-4 mr-2" />
            Download TXT
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClear}
            disabled={!hasUUIDs}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {!hasUUIDs ? (
        <div className="flex h-[300px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center text-muted-foreground">
          <p className="text-sm font-medium">No UUIDs generated yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Click &quot;Generate UUIDs&quot; below to generate new identifiers.
          </p>
        </div>
      ) : (
        <div className="max-h-[350px] overflow-y-auto space-y-2 rounded-lg border border-input bg-background p-3 font-mono">
          {uuids.map((uuid, idx) => (
            <div
              key={`${uuid}-${idx}`}
              className="group flex items-center justify-between rounded-md bg-card border border-border/50 px-3 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-accent/40"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs text-muted-foreground w-6 text-right shrink-0">
                  {idx + 1}.
                </span>
                <span className="font-semibold tracking-wide truncate">{uuid}</span>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onCopyOne(uuid)}
                title="Copy single UUID"
                className="h-7 w-7 text-muted-foreground hover:text-foreground opacity-80 group-hover:opacity-100 shrink-0"
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
